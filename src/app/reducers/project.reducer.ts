
/**
 * 2017.10.13 增加 用于项目的几种呢处理
 * 2017.10.16 修复 邀请用户成功时信号没有处理表的问题
 */
import * as actions from '../actions/project.action';
import { Project } from '../domain/project.model';
import { ActionTypes } from '../actions/project.action';
import { Action } from '@ngrx/store';
import * as _ from 'lodash';
import { createSelector } from 'reselect';

export interface State {
    ids: string[];
    entities: {[id: string]: Project};
    selectedId: string | null;
};

export const initialState: State = {
    ids: [],
    entities: {},
    selectedId: null
};
export const actionTypes = actions.ActionTypes;
export function reducer(state = initialState, action: actions.Actions ): State {
    switch (action.type) {
        case actionTypes.ADD_SUCCESS: {
            return addProject(state, action);
        }
        case actionTypes.INVITE_SUCCESS:
        case actionTypes.UPDATE_SUCCESS: {
            return updateProject(state, action);
        }
        case actionTypes.DELETE_SUCCESS: {
            return delProject(state, action);
        }
        case actionTypes.LOAD_SUCCESS: {
            return loadProjects(state, action);
        }
        default: {
            return state;
        }
    }
}

const addProject = (state: State, action: Action) => {
    const project = <Project>action.payload;
    if (state.entities[project.id]) {
        return state;
    }
    const ids = [...state.ids, project.id];
    const entities = {...state.entities, [project.id]: project};
    return {...state, ids, entities};
}
const updateProject = (state: State, action: Action) => {
    const project = <Project>action.payload;
    if (!state.entities[project.id]) {
        return state;
    }
    const entities = {...state.entities, [project.id]: project};
    return {...state, entities};
}
const delProject = (state: State, action: Action) => {
    const project = <Project>action.payload;
    if (state.ids.indexOf(project.id) === -1) {
        return state;
    }
    const newIds = state.ids.filter(id => id !== project.id);
    const newEntities = newIds.reduce((entities, id) => ({...entities, [id]: state.entities[id]}), {})
    return {...state, ids: newIds, entities: newEntities};
}
const loadProjects = (state: State, action: Action) => {
    const projects = <Project[]>action.payload;
    const incomingIds = projects.map(p => p.id);
    const incomingEntities = _.chain(projects).keyBy('id').mapValues(o => o).value();
    const diffIds = _.difference(incomingIds, state.ids);
    const newEntities = diffIds.reduce((entities, id) => ({...entities, [id]: incomingEntities[id]}), {});
    return {...state, ids: [...state.ids, ...diffIds], entities: {...state.entities, ...newEntities}};
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedId = (state: State) => state.selectedId;
export const getAllProjects  = createSelector(getIds, getEntities, (ids, entities) => {
    return ids.map(id => entities[id]); // Project[]
});
