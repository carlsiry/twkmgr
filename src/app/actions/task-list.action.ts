
/**
 * 2017.10.12 创建关于任务列表状态的变更信号: load, add, update, delete, swap
 */
import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';
import { TaskList } from '../domain/task-list.model';

// 根任务列表相关的信号类型
export const ActionTypes = {
  ADD:              type('[TaskList] Add'),
  ADD_SUCCESS:      type('[TaskList] Add Success'),
  ADD_FAIL:         type('[TaskList] Add Fail'),
  DELETE:           type('[TaskList] Delete'),
  DELETE_SUCCESS:   type('[TaskList] Delete Success'),
  DELETE_FAIL:      type('[TaskList] Delete Fail'),
  UPDATE:           type('[TaskList] Update'),
  UPDATE_SUCCESS:   type('[TaskList] Update Success'),
  UPDATE_FAIL:      type('[TaskList] Update Fail'),
  LOAD:             type('[TaskList] Load'),
  LOAD_SUCCESS:     type('[TaskList] Load Success'),
  LOAD_FAIL:        type('[TaskList] Load Fail'),
  SWAP:             type('[TaskList] Swap'),
  SWAP_SUCCESS:     type('[TaskList] Swap Success'),
  SWAP_FAIL:        type('[TaskList] Swap Fail'),
};

// 加载 任务列表信号
export class LoadAction implements Action {
    type = ActionTypes.LOAD;

    constructor(public payload: string) { }
  }
export class LoadSuccessAction implements Action {
    type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: TaskList[]) { }
}
export class LoadFailAction implements Action {
    type = ActionTypes.LOAD_FAIL;

    constructor(public payload: string) { }
}
// 增加 任务列表信号
export class AddAction implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: TaskList) { }
}
export class AddSuccessAction implements Action {
  type = ActionTypes.ADD_SUCCESS;

  constructor(public payload: TaskList) { }
}
export class AddFailAction implements Action {
  type = ActionTypes.ADD_FAIL;

  constructor(public payload: string) { }
}
// 更新 任务列表信号
export class UpdateAction implements Action {
  type = ActionTypes.UPDATE;

  constructor(public payload: TaskList) { }
}
export class UpdateSuccessAction implements Action {
  type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: TaskList) { }
}
export class UpdateFailAction implements Action {
  type = ActionTypes.UPDATE_FAIL;

  constructor(public payload: string) { }
}
// 删除 任务列表信号
export class DeleteAction implements Action {
  type = ActionTypes.DELETE;

  constructor(public payload: TaskList) { }
}
export class DeleteSuccessAction implements Action {
  type = ActionTypes.DELETE_SUCCESS;

constructor(public payload: TaskList) { }
}
export class DeleteFailAction implements Action {
  type = ActionTypes.DELETE_FAIL;

  constructor(public payload: string) { }
}
// 交换 任务列表顺序信号
export class SwapAction implements Action {
  type = ActionTypes.SWAP;

  constructor(public payload: {src: TaskList, target: TaskList}) { }
}
export class SwapSuccessAction implements Action {
  type = ActionTypes.SWAP_SUCCESS;

constructor(public payload: TaskList[]) { }
}
export class SwapFailAction implements Action {
  type = ActionTypes.SWAP_FAIL;

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
  | SwapAction
  | SwapSuccessAction
  | SwapFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteFailAction;
