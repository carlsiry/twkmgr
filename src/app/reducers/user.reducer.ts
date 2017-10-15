
/**
 * 2017.10.15 增加 用于用户的操作信号处理器
 */
import { Action } from '@ngrx/store';
import { createSelector } from 'reselect';
import * as actions from '../actions/user.action';
import * as prjActions from '../actions/project.action';
import * as _ from 'lodash';
import { ActionTypes } from '../actions/user.action';
import { Project } from '../domain/project.model';
import { User } from '../domain/user.model';

export interface State {
    ids: string[];
    entities: {[id: string]: User};
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
            return addUser(state, action);
        }
        case actionTypes.DELETE_SUCCESS: {
            return delUser(state, action);
        }
        case actionTypes.UPDATE_SUCCESS: {
            return updateUser(state, action);
        }
        case actionTypes.SEARCH_SUCCESS:
        case actionTypes.DELETE_SUCCESS: {
            return delUser(state, action);
        }
        case actionTypes.LOAD_SUCCESS: {
            return loadUsers(state, action);
        }
        default: {
            return state;
        }
    }
}

const addUser = (state: State, action: Action) => {
    const user = <User>action.payload;
    const newIds = [...state.ids, user.id];
    const newEntities = {...state.entities, [user.id]: user};
    return state.entities[user.id] ?
        {...state, entities: newEntities} : {...state, ids: newIds, entities: newEntities};
}
const updateUser = (state: State, action: Action) => {
    const users = <User[]>action.payload;
    const incomingEntities = _.chain(users).keyBy('id').mapValues(o => o as User).value();
    const newEntities = {...state.entities, ...incomingEntities};
    return {...state, entities: newEntities};
}
const delUser = (state: State, action: Action) => {
    const user = <User>action.payload;
    const newEntities = {...state.entities, [user.id]: user};
    return state.entities[user.id] ? {...state, entities: newEntities} : state;
}
const loadUsers = (state: State, action: Action) => {
    const users = <User[]>action.payload;
    const incomingIds = users.map(u => u.id);
    const newIds = _.difference(incomingIds, state.ids);
    const incomingEntities = _.chain(users).keyBy('id').mapValues(o => o).value();
    const newEntities = newIds.reduce((entities, id) => ({...entities, [id]: incomingEntities[id]}), {});
    return { ids: [...state.ids, ...newIds], entities: {...state.entities, ...newEntities}};
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getUsers  = createSelector(getIds, getEntities, (ids, entities) => {
    return ids.map(id => entities[id]); // User[]
});
