
/**
 * 2017.10.14 创建用于 任务列表业务 的 effects流
 */
import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect} from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import * as actions from '../actions/task-list.action';
import * as fromRoot from '../reducers';
import { TaskListService } from '../services/task-list.service';

@Injectable()
export class TaskListEffects {

    //                                              -> 失败：发起"加载失败"信号
    // 加载流程：捕获"加载"信号 -> 调用服务获取列表内容 -> 成功：发起"加载成功"信号
    @Effect()
    loadTaskLists$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.LOAD)
        .map(toPayload)
        .switchMap(projectId => this.service$.get(projectId)
            .map(taskLists => new actions.LoadSuccessAction(taskLists))
            .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
        );
    //                                      -> 失败： 发起 增加失败信号
    // 新增任务列表流：捕获"增加"信号 -> 调用服务 -> 成功：发起“增加成功"信号
    @Effect()
    addTaskList$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.ADD)
        .map(toPayload)
        .switchMap(taskList => this.service$.add(taskList)
            .map(tl => new actions.AddSuccessAction(tl))
            .catch(err => Observable.of(new actions.AddFailAction(JSON.stringify(err))))
        );
    //                                                  -> 失败： 发起“更新失败”信号
    // 跟新任务列表流：捕获"跟新"信号 -> 调用服务：更新任务列表 -> 成功：发起“更新成功"信号
    @Effect()
    updateTaskList$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.UPDATE)
        .map(toPayload)
        .switchMap( taskList => this.service$.update(taskList)
            .map(tl => new actions.UpdateSuccessAction(tl))
            .catch(err => Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))
        );
    //                                                  -> 失败： 发起“删除失败”信号
    // 删除任务列表流：捕获"删除"信号 -> 调用服务：删除项目 -> 成功：发起“删除成功"信号
    @Effect()
    deleteTaskList$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.DELETE)
        .map(toPayload)
        .switchMap( taskList => this.service$.del(taskList)
            .map( tl => new actions.DeleteSuccessAction(tl))
            .catch(err => Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))
        );
    //                                    -> 失败： 发起 “交换失败信号”
    // 交换任务列表顺序流：捕获"交换"信号 -> 调用服务"：交换顺序 -> 成功：发起“交换成功"信号
    @Effect()
    swap$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.SWAP)
        .map(toPayload)
        .switchMap( ({src, target}) => this.service$.swapOrder(src, target)
            .map(tasklists => new actions.SwapSuccessAction(tasklists))
            .catch(err => Observable.of(new actions.SwapFailAction(JSON.stringify(err))))
        );

    constructor (
        private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private service$: TaskListService,
    ) { }
}
