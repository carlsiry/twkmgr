
/**
 * 2017.10.12 创建用于 用户认证 的 effects流
 */
import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect} from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import * as actions from '../actions/auth.action';
import { AuthService } from '../services/auth.service';
import { go } from '@ngrx/router-store';

@Injectable()
export class AuthEffects {

    // 登录流：捕获"登录"([Auth] login)信号 -> 使用认证服务 -> 成功：发起 登录成功信号
    //                                 -> 失败：发起 登录失败信号
    @Effect()
    login$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.LOGIN)
        .map(toPayload) // map(a => a.payload)
        .switchMap(({email, password}) => this.service$.login(email, password)
            .map(auth => new actions.LoginSuccessAction(auth))
            .catch(err => Observable.of(new actions.LoginFailAction(JSON.stringify(err))))
        );
    //  ||
    //  V
    // 登录成功流： 捕获"登录成功"([Auth] login success)信号 -> 路由跳转至项目路由
    @Effect()
    loginAndNavigate$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.LOGIN_SUCCESS)
        .map(_ => go(['/projects']));

    // 注册流：捕获注册信号 -> 使用认证服务 -> 成功： 发起 注册成功信号
    //                                 -> 失败： 发起 注册失败信号
    @Effect()
    register$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.REGISTER)
        .map(toPayload)
        .switchMap((user) => this.service$.register(user)
            .map(auth => new actions.RegisterSuccessAction(auth))
            .catch(err => Observable.of(new actions.RegisterFailAction(JSON.stringify(err))))
        );
    // 退出流：捕获退出信号 -> 使用认证服务 -> 路由跳转至根
    @Effect()
    logout$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.LOGOUT)
        .map(_ => go(['/']));

    // 注册成功流： 捕获 注册成功信号 -> 路由跳转至项目路由
    @Effect()
    registerAndNavigate$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.REGISTER_SUCCESS)
        .map(_ => go(['/projects']));

    constructor(private actions$: Actions, private service$: AuthService) {}
}
