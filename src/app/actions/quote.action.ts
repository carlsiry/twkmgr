
/**
 * 2017.10.11 创建操作
 * 2017.10.12 改写操作为严格的强类型
 */

import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';
import { Quote } from '../domain/quote.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export const ActionTypes = {
  LOAD:           type('[Quote] Load'),
  LOAD_SUCCESS:   type('[Quote] Load Success'),
  LOAD_FAIL:      type('[Quote] Load Fail'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: null) { }
}
export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Quote) { }
}
export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = LoadAction | LoadSuccessAction | LoadFailAction;
