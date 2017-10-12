
/**
 * 2017.10.11 创建 Store 模块，定义初始状态和reducer
 * 2017.10.12 使用缓存选择函数得到具体状态数据
 */
import { NgModule } from '@angular/core';
import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromQuote from './quote.reducer';
import { compose } from '@ngrx/core/compose';
import { createSelector } from 'reselect';

import { environment } from '../../environments/environment';

// 应用级的状态，由子状态构成
export interface State {
    quote: fromQuote.State
};
export const getQuoteState = (state: State) => state.quote;
export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);

// 真个应用的初始状态
export const initialState: State = {
    quote: fromQuote.initialState
};
// 归集器字典
export const reducers = {
    quote: fromQuote.reducer
}
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
