
/**
 * 2017.10.14 增加 用于任务列表的几种处理
 */
import { Action } from '@ngrx/store';
import { createSelector } from 'reselect';
import * as actions from '../actions/task-list.action';
import * as prjActions from '../actions/project.action';
import * as _ from 'lodash';
import { ActionTypes } from '../actions/task-list.action';
import { Project } from '../domain/project.model';
import { TaskList } from '../domain/task-list.model';

export interface State {
    ids: string[];
    entities: {[id: string]: TaskList};
    selectedIds: string[];
};

export const initialState: State = {
    ids: [],
    entities: {},
    selectedIds: [],
};
export const actionTypes = actions.ActionTypes;
export const prjActionTypes = prjActions.ActionTypes;
export function reducer(state = initialState, action: actions.Actions ): State {
    switch (action.type) {
        case actionTypes.ADD_SUCCESS: {
            return addTaskList(state, action);
        }
        case actionTypes.UPDATE_SUCCESS: {
            return updateTaskList(state, action);
        }
        case actionTypes.DELETE_SUCCESS: {
            return delTaskList(state, action);
        }
        case actionTypes.LOAD_SUCCESS: {
            return loadTaskLists(state, action);
        }
        // case actionTypes.SWAP_SUCCESS: {
            // return swapTaskLists(state, action);
        // }
        case prjActionTypes.SELECT_PROJECT: {

            return selectPrj(state, action);
        }
        case prjActionTypes.DELETE_SUCCESS: {
            return delListsByPrj(state, action);
        }
        default: {
            return state;
        }
    }
}
const selectPrj = (state: State, action: Action) => {
    const selected = <Project>action.payload;
    const selectedIds = state.ids.filter(id => state.entities[id].projectId === selected.id);
    return {...state, selectedIds};
}
const delListsByPrj = (state: State, action: Action) => {
    const project = <Project>action.payload;
    const taskListIds = project.taskLists; // project.taskLists 其实是 taskList.id[]
    const remainingIds = _.difference(state.ids, taskListIds);
    const remainingEntities = remainingIds.reduce((entities, id) => ({...entities, [id]: state.entities[id]}), {});
    return {ids: [...remainingIds], entities: remainingEntities, selectedIds: []};
}
const swapTaskLists = (state: State, action: Action) => {
    const taskLists = <TaskList[]>action.payload;
    const updatedEntities = _.chain(taskLists).keyBy('id').mapValues(o => o).value();
    const newEntities = {...state.entities, ...updatedEntities};
    return {...state, entities: newEntities};
}
const addTaskList = (state: State, action: Action) => {
    const taskList = <TaskList>action.payload;
    if (state.entities[taskList.id]) {
        return state;
    }
    const ids = [...state.ids, taskList.id];
    const entities = {...state.entities, [taskList.id]: taskList};
    return {...state, ids, entities};
}
const updateTaskList = (state: State, action: Action) => {
    const taskList = <TaskList>action.payload;
    if (!state.entities[taskList.id]) {
        return state;
    }
    const entities = {...state.entities, [taskList.id]: taskList};
    return {...state, entities};
}
const delTaskList = (state: State, action: Action) => {
    const taskList = <TaskList>action.payload;
    if (state.ids.indexOf(taskList.id) === -1) {
        return state;
    }
    const newIds = state.ids.filter(id => id !== taskList.id);
    const newEntities = newIds.reduce((entities, id) => ({...entities, [id]: state.entities[id]}), {})
    const newSelectedIds = state.selectedIds.filter(id => id !== taskList.id);
    return {...state, ids: newIds, entities: newEntities, selectedIds: newSelectedIds};
}
const loadTaskLists = (state: State, action: Action) => {
    const taskLists = <TaskList[]>action.payload;
    console.log('loadTaskLists ...');
    console.log(taskLists);
    const incomingIds = taskLists.map(p => p.id);
    const incomingEntities = _.chain(taskLists).keyBy('id').mapValues(o => o).value();
    const diffIds = _.difference(incomingIds, state.ids);
    const newEntities = diffIds.reduce((entities, id) => ({...entities, [id]: incomingEntities[id]}), {});
    return {...state, ids: [...state.ids, ...diffIds], entities: {...state.entities, ...newEntities}};
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedIds = (state: State) => state.selectedIds;
export const getSelected  = createSelector(getIds, getEntities, (ids, entities) => {
    return ids.map(id => entities[id]); // TaskList[]
});
