
/**
 * 2017.10.14 创建用于用户的 操作信号
 */

import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';
import { User } from '../domain/user.model';
import { Project } from '../domain/project.model';

export interface UserProject {
    user: User;
    projectId: string;
}

// 根任务相关的信号类型
export const ActionTypes = {
  ADD:              type('[User] Add User Project '),
  ADD_SUCCESS:      type('[User] Add User Project Success'),
  ADD_FAIL:         type('[User] Add User Project Fail'),
  DELETE:           type('[User] Delete User Project'),
  DELETE_SUCCESS:   type('[User] Delete User Project Success'),
  DELETE_FAIL:      type('[User] Delete User Project Fail'),
  UPDATE:           type('[User] Update User Project'),
  UPDATE_SUCCESS:   type('[User] Update User Project Success'),
  UPDATE_FAIL:      type('[User] Update User Project Fail'),
  LOAD:             type('[User] Load Users By Project'),
  LOAD_SUCCESS:     type('[User] Load Users By Project Success'),
  LOAD_FAIL:        type('[User] Load Users By Project Fail'),
  SEARCH:             type('[User] Search'),
  SEARCH_SUCCESS:     type('[User] Search Success'),
  SEARCH_FAIL:        type('[User] Search Fail'),
};

// 加载 任务列表信号
export class LoadAction implements Action {
    type = ActionTypes.LOAD;

    constructor(public payload: string) { }
  }
export class LoadSuccessAction implements Action {
    type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: User[]) { }
}
export class LoadFailAction implements Action {
    type = ActionTypes.LOAD_FAIL;

    constructor(public payload: string) { }
}
// 增加 任务列表信号
export class AddAction implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: UserProject) { }
}
export class AddSuccessAction implements Action {
  type = ActionTypes.ADD_SUCCESS;

  constructor(public payload: User) { }
}
export class AddFailAction implements Action {
  type = ActionTypes.ADD_FAIL;

  constructor(public payload: string) { }
}
// 更新 任务列表信号
export class UpdateAction implements Action {
  type = ActionTypes.UPDATE;

  constructor(public payload: Project) { }
}
export class UpdateSuccessAction implements Action {
  type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: User[]) { }
}
export class UpdateFailAction implements Action {
  type = ActionTypes.UPDATE_FAIL;

  constructor(public payload: string) { }
}
// 删除 任务信号
export class DeleteAction implements Action {
  type = ActionTypes.DELETE;

  constructor(public payload: UserProject) { }
}
export class DeleteSuccessAction implements Action {
  type = ActionTypes.DELETE_SUCCESS;

constructor(public payload: User) { }
}
export class DeleteFailAction implements Action {
  type = ActionTypes.DELETE_FAIL;

  constructor(public payload: string) { }
}
// 搜索用户信号
export class SearchAction implements Action {
  type = ActionTypes.SEARCH;

  constructor(public payload: string) { }
}
export class SearchSuccessAction implements Action {
  type = ActionTypes.SEARCH_SUCCESS;

constructor(public payload: User[]) { }
}
export class SearchFailAction implements Action {
  type = ActionTypes.SEARCH_FAIL;

  constructor(public payload: string) { }
}


// 所有的 操作信号
export type Actions
  = AddAction
  | AddSuccessAction
  | AddFailAction
  | UpdateAction
  | UpdateSuccessAction
  | UpdateFailAction
  | SearchAction
  | SearchSuccessAction
  | SearchFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteFailAction;
