
/**
 * 2017.10.12 创建用于 项目业务 的 effects流
 *      10.14 增加 处理选择项目到任务列表的流程
 *      10.15 增加 处理用户邀请成员、增加项目、移除项目的操作流
 */
import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect} from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import * as actions from '../actions/project.action';
import { AuthService } from '../services/auth.service';
import { go } from '@ngrx/router-store';
import { ProjectService } from 'app/services/project.service';
import * as fromRoot from '../reducers';
import * as listActions from '../actions/task-list.action';
import * as userActions from '../actions/user.action';
import { Project } from '../domain/project.model';
import { AddAction, DeleteAction } from '../actions/task-list.action';

@Injectable()
export class ProjectEffects {

    //                                   -> 失败：发起"加载失败"信号
    // 加载流程：捕获"加载"信号 -> 查询认证状态 -> 成功：发起"加载成功"信号
    @Effect()
    loadProjects$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.LOAD)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getAuthState))
        .switchMap(([_, auth]) => this.service$.get(auth.userId)
            .map(projects => new actions.LoadSuccessAction(projects))
            .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
        );
    //                                      -> 失败： 发起 注册失败信号
    // 新增项目流：捕获"增加"信号 -> 查询认证状态 -> 通过：  调用"项目服务"：新增项目 -> 成功：发起“增加成功"信号
    @Effect()
    addProject$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.ADD)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getAuthState).map(auth => auth.user))
        .switchMap(([project, user]) => {
            const added = {...project, members: [`${user.id}`]};
            return this.service$.add(added)
            .map(p => new actions.AddSuccessAction(p))
            .catch(err => Observable.of(new actions.AddFailAction(JSON.stringify(err))));
        });
    //                                                  -> 失败： 发起“更新失败”信号
    // 跟新项目流：捕获"跟新"信号 -> 调用"项目服务"：更新项目 -> 成功：发起“更新成功"信号
    @Effect()
    updateProject$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.UPDATE)
        .map(toPayload)
        .switchMap( (project) => this.service$.update(project)
            .map(p => new actions.UpdateSuccessAction(p))
            .catch(err => Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))
        );
    //                                                  -> 失败： 发起“删除失败”信号
    // 删除项目流：捕获"删除"信号 -> 调用"项目服务"：删除项目 -> 成功：发起“删除成功"信号
    @Effect()
    deleteProject$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.DELETE)
        .map(toPayload)
        .switchMap( (project) => this.service$.del(project)
            .map(p => new actions.DeleteSuccessAction(p))
            .catch(err => Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))
        );
    //                                      -> 失败： 发起 “邀请失败信号”
    // 邀请成员流：捕获"邀请"信号 -> 调用"项目服务"：邀请成员 -> 成功：发起“邀请成功"信号
    @Effect()
    invite$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.INVITE)
        .map(toPayload)
        .switchMap( ({projectId, memebers}) => this.service$.invite(projectId, memebers)
            .map(p => new actions.InviteSuccessAction(p))
            .catch(err => Observable.of(new actions.InviteFailAction(JSON.stringify(err))))
        );

    // 选择项目流
    @Effect()
    selectProject$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.SELECT_PROJECT)
        .map(toPayload)
        .map(project => go([`/tasklists/${project.id}`]));

    // 选择项目同时加载 任务列表： 发起 加载任务列表信号
    @Effect()
    loadTaskLists$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.SELECT_PROJECT)
        .map(toPayload)
        .map(project => new listActions.LoadAction(project.id));

    // 加载用户，捕获项目加载成功信号，根据项目id 发起加载相关的用户信息的信号
    @Effect()
    loadUsers$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.LOAD_SUCCESS)
        .map(toPayload)
        .switchMap( (projects: Project[]) => Observable.from(projects.map(proj => proj.id)))
        .map(projectId => new userActions.LoadAction(projectId));
    // 每当新增一个项目时，捕获增加成功信号，根据项目的id 发起用户增加项目的信号
    @Effect()
    addUserProject$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.ADD_SUCCESS)
        .map(toPayload)
        .map(project => project.id)
        .withLatestFrom(this.store$.select(fromRoot.getAuthState).map(auth => auth.user), (projectId, user) => {
            return new userActions.AddAction({user: user, projectId: projectId})
        });
    @Effect()
    // 删除项目时，发起移除用户相关的项目引用信号
    removeUserProject$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.DELETE_SUCCESS)
        .map(toPayload)
        .map(project => project.id)
        .withLatestFrom(this.store$.select(fromRoot.getAuthState).map(auth => auth.user), (projectId, user) => {
            return new userActions.DeleteAction({user: user, projectId: projectId})
        });
    // 用户在项目卡片邀请成员到项目成功时，发起用户项目更新信号
    @Effect()
    updateUserProject$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.INVITE_SUCCESS)
        .map(toPayload)
        .map(project => new userActions.UpdateAction(project));
    constructor (
        private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private service$: ProjectService
    ) { }
}
