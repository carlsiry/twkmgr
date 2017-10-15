
/**
 * 2017.10.14 增加 用于任务的操作信号处理器
 */
import { Action } from '@ngrx/store';
import { createSelector } from 'reselect';
import * as actions from '../actions/task.action';
import * as prjActions from '../actions/project.action';
import * as _ from 'lodash';
import { ActionTypes } from '../actions/task.action';
import { Project } from '../domain/project.model';
import { Task } from '../domain/task.model';

export interface State {
    ids: string[];
    entities: {[id: string]: Task};
};

export const initialState: State = {
    ids: [],
    entities: {},
};
export const actionTypes = actions.ActionTypes;
export const prjActionTypes = prjActions.ActionTypes;
export function reducer(state = initialState, action: actions.Actions ): State {
    switch (action.type) {
        case actionTypes.ADD_SUCCESS: {
            return addTask(state, action);
        }
        case actionTypes.COMPLETE_SUCCESS:
        case actionTypes.MOVE_SUCCESS:
        case actionTypes.UPDATE_SUCCESS: {
            return updateTask(state, action);
        }
        case actionTypes.DELETE_SUCCESS: {
            return delTask(state, action);
        }
        case actionTypes.MOVE_ALL_SUCCESS: {
            return moveAllTasks(state, action);
        }
        case actionTypes.LOAD_SUCCESS: {
            return loadTasks(state, action);
        }
        case prjActionTypes.DELETE_SUCCESS: {
            return delByPrj(state, action);
        }
        default: {
            return state;
        }
    }
}
const moveAllTasks = (state: State, action: Action) => {
    const tasks = <Task[]>action.payload;
    const updatedEntities = tasks.reduce((entities, task) => ({...entities, [task.id]: task }), {})
    return {...state, entities: {...state.entities, ...updatedEntities}};
}
const delByPrj = (state: State, action: Action) => {
    const project = <Project>action.payload;
    const taskListIds = project.taskLists;
    const remainingIds = state.ids.filter(id => taskListIds.indexOf(state.entities[id].taskListId) === -1);
    const remainingEntities = remainingIds.reduce((entities, id) => ({...entities, [id]: state.entities[id]}), {});
    return {ids: [...remainingIds], entities: remainingEntities };
}

const addTask = (state: State, action: Action) => {
    const taskList = <Task>action.payload;
    if (state.entities[taskList.id]) {
        return state;
    }
    const ids = [...state.ids, taskList.id];
    const entities = {...state.entities, [taskList.id]: taskList};
    return {...state, ids, entities};
}
const updateTask = (state: State, action: Action) => {
    const taskList = <Task>action.payload;
    if (!state.entities[taskList.id]) {
        return state;
    }
    const entities = {...state.entities, [taskList.id]: taskList};
    return {...state, entities};
}
const delTask = (state: State, action: Action) => {
    const taskList = <Task>action.payload;
    if (state.ids.indexOf(taskList.id) === -1) {
        return state;
    }
    const newIds = state.ids.filter(id => id !== taskList.id);
    const newEntities = newIds.reduce((entities, id) => ({...entities, [id]: state.entities[id]}), {})
    return {...state, ids: newIds, entities: newEntities};
}
const loadTasks = (state: State, action: Action) => {
    const tasks = <Task[]>action.payload;
    console.log('loadTasks ...');
    console.log(tasks);
    const incomingIds = tasks.map(p => p.id);
    const incomingEntities = _.chain(tasks).keyBy('id').mapValues(o => o).value();
    const diffIds = _.difference(incomingIds, state.ids);
    const newEntities = diffIds.reduce((entities, id) => ({...entities, [id]: incomingEntities[id]}), {});
    return {...state, ids: [...state.ids, ...diffIds], entities: {...state.entities, ...newEntities}};
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getTasks  = createSelector(getIds, getEntities, (ids, entities) => {
    return ids.map(id => entities[id]); // Task[]
});
