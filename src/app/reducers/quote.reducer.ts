
/**
 * 2017.10.11 创建初步的归集器
 * 2017.10.12 使用强类型操作类型、使用函数得到状态数据
 *      10.14 更改了加载成功返回的状态格式
 */

import * as actions from '../actions/quote.action';
import { Quote } from '../domain/quote.model';

export interface State {
    quote: Quote;
};

export const initialState: State = {
    quote: {
        cn: '满足感在于不断的努力，而不是现有成就。全心努力定会胜利满满。',
        en: 'Satisfaction lies in the effort, not in the attainment. Full effort is full victory. ',
        pic: 'assets/img/quote_fallback.jpg',
    }
};

export function reducer(state = initialState, action: actions.Actions ): State {
    switch (action.type) {
        case actions.ActionTypes.LOAD_SUCCESS: {
            return { quote: <Quote>action.payload};
        }
        case actions.ActionTypes.LOAD_FAIL:
        default: {
            return state;
        }
    }
}
export const getQuote = (state: State) => state.quote;
