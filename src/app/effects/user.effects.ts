
/**
 * 2017.10.14 创建用于 用户业务 的 effects流
 *      1. 项目列表组件加载项目成功后，会发起 “加载用户” 信号
 *      2. @UserEffects 捕获到 “加载“ 信号后，会调用 @UserService 根据项目ID获取一个用户列表
 *          获取用户列表成功后，发起 “加载成功” 信号，@Reducer 根据“加载成功”信号中的用户列表跟新到 @Store中
 * 2017.10.17 修复根据项目加载相关用户请求被打断的操作（switchMap=>mergeMap）
 */
import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect} from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import * as actions from '../actions/user.action';
import * as fromRoot from '../reducers';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {

    //                                              -> 失败：发起"加载失败"信号
    // 加载流程：捕获"加载"信号 -> 调用服务获取用户列表 -> 成功：发起"加载成功"信号
    @Effect()
    loadUsers$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.LOAD)
        .map(toPayload)
        // 这里不能使用 switchMap 服务定义的http请求只在订阅时才发射，所以新的信号进来前面的请求流会被打断
        .mergeMap(projectId => this.service$.getUsersByProject(projectId)
            .map(users => new actions.LoadSuccessAction(users))
            .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
        );
    //                                      -> 失败： 发起 增加失败信号
    // 新增任务列表流：捕获"增加"信号 -> 调用服务 -> 成功：发起“增加成功"信号
    @Effect() // 增加的是用户和项目的引用关系
    addUserProjectRef$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.ADD)
        .map(toPayload)
        .switchMap(({user, projectId}) => this.service$.addProjectRef(user, projectId)
            .map(u => new actions.AddSuccessAction(u))
            .catch(err => Observable.of(new actions.AddFailAction(JSON.stringify(err))))
        );
    //                                                  -> 失败： 发起“更新失败”信号
    // 跟新任务列表流：捕获"跟新"信号 -> 调用服务：更新任务列表 -> 成功：发起“更新成功"信号
    @Effect()
    updateUserProjectRef$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.UPDATE)
        .map(toPayload)
        .switchMap( project => this.service$.batchUpdateProjectRef(project)
            .map(users => new actions.UpdateSuccessAction(users))
            .catch(err => Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))
        );
    //                                                  -> 失败： 发起“删除失败”信号
    // 删除任务列表流：捕获"删除"信号 -> 调用服务：删除项目 -> 成功：发起“删除成功"信号
    @Effect()
    deleteUserProjectRef$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.DELETE)
        .map(toPayload)
        .switchMap( ({user, projectId}) => this.service$.removeProjectRef(user, projectId)
            .map( u => new actions.DeleteSuccessAction(u))
            .catch(err => Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))
        );
    //                                    -> 失败： 发起 “交换失败信号”
    // 交换任务列表顺序流：捕获"交换"信号 -> 调用服务"：交换顺序 -> 成功：发起“交换成功"信号
    @Effect()
    search$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.SEARCH)
        .map(toPayload)
        .switchMap( str => this.service$.searchUsers(str)
            .map(users => new actions.SearchSuccessAction(users))
            .catch(err => Observable.of(new actions.SearchFailAction(JSON.stringify(err))))
        );

    constructor (
        private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private service$: UserService,
    ) { }
}
