
/**
 * 2017.10.11 创建 Store 模块，定义初始状态和reducer
 * 2017.10.12 使用缓存选择函数得到具体状态数据
 *      - 加入了认证的State和reducer
 *     10.13 - 加入了项目的状态管理
 *     10.14 - 加入了任务列表的状态管理
 */
import { NgModule } from '@angular/core';
import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

// 子 reducer: 包含 state接口类型 和 state初始状态
import * as fromQuote from './quote.reducer';
import * as fromAuth from './auth.reducer';
import * as fromProject from './project.reducer';
import * as fromTaskList from './task-list.reducer';
import * as fromTask from './task.reducer';
import * as fromUser from './user.reducer';

import { compose } from '@ngrx/core/compose';
import { createSelector } from 'reselect';

import { environment } from '../../environments/environment';
import { Auth } from '../domain/auth.model';

// 应用级的状态，由子状态构成
export interface State {
    quote: fromQuote.State
    auth: Auth,
    project: fromProject.State,
    taskList: fromTaskList.State,
    task: fromTask.State,
    user: fromUser.State,
};

// 快捷获取一些具体状态
export const getQuoteState = (state: State) => state.quote;
export const getAuthState = (state: State) => state.auth;
export const getProjectState = (state: State) => state.project;
export const getTaskListState = (state: State) => state.taskList;
export const getTaskState = (state: State) => state.task;
export const getUserState = (state: State) => state.user;

// 快捷获取一些具体状态详细数据
export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);
export const getProjects = createSelector(getProjectState, fromProject.getAllProjects);
export const getTaskLists = createSelector(getTaskListState, fromTaskList.getSelected);
export const getTask = createSelector(getTaskState, fromTask.getTasks);
export const getUsers = createSelector(getUserState, fromUser.getUsers);

export const getUserEntities = createSelector(getUserState, fromUser.getEntities);
export const getTasksWithOwners = createSelector(getTask, getUserEntities, (tasks, userEntities) => {
    return tasks.map(task => {
        return {
            ...task,
            owner: userEntities[task.owerId],
            participants: task.participantIds.map(id => userEntities[id])
        };
    });
});

export const getTasksByLists = createSelector(getTaskLists, getTasksWithOwners, (lists, tasks) => {
    return lists.map(list => {
        return {
            ...list,
            tasks: tasks.filter(task => task.taskListId === list.id)
        };
    });
});

export const getProjectUsers = (projectId: string) => createSelector(getProjectState, getUserEntities, (state, userEntities) => {
    return state.entities[projectId].members.map(id => userEntities[id]);
});

// 整个应用的初始状态
export const initialState: State = {
    quote: fromQuote.initialState,
    auth: fromAuth.initialState,
    project: fromProject.initialState,
    taskList: fromTaskList.initialState,
    task: fromTask.initialState,
    user: fromUser.initialState,
};
// 归集器字典
export const reducers = {
    quote: fromQuote.reducer,
    auth: fromAuth.reducer,
    project: fromProject.reducer,
    taskList: fromTaskList.reducer,
    task: fromTask.reducer,
    user: fromUser.reducer,
};
// 生产环境和开发环境下 归集器
const productionReducers: ActionReducer<State> = combineReducers(reducers);
const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers)

export function reducer(state = initialState, action: any): State {
    return environment.production ? productionReducers(state, action) : developmentReducers(state, action);
}

@NgModule({
    imports: [
        StoreModule.provideStore(reducer),
        RouterStoreModule.connectRouter(),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
    ],
    providers: [],
})
export class AppStoreModule {}
