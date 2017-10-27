
/**
 * 2017.10.14 创建用于 任务列表业务 的 effects流
 */
import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect} from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import * as actions from '../actions/task.action';
import * as fromRoot from '../reducers';
import { TaskService } from '../services/task.service';

@Injectable()
export class TaskEffects {

    //                                              -> 失败：发起"加载失败"信号
    // 加载流程：捕获"加载"信号 -> 调用服务获取列表内容 -> 成功：发起"加载成功"信号
    @Effect()
    loadTasks$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.LOAD)
        .map(toPayload)
        .switchMap(taskLists => this.service$.getByLists(taskLists)
            .map(tasks => new actions.LoadSuccessAction(tasks))
            .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
        );
    //                                      -> 失败： 发起 增加失败信号
    // 新增任务列表流：捕获"增加"信号 -> 调用服务 -> 成功：发起“增加成功"信号
    @Effect()
    addTask$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.ADD)
        .map(toPayload)
        .switchMap(task => this.service$.add(task)
            .map(t => new actions.AddSuccessAction(t))
            .catch(err => Observable.of(new actions.AddFailAction(JSON.stringify(err))))
        );
    //                                                  -> 失败： 发起“更新失败”信号
    // 跟新任务列表流：捕获"跟新"信号 -> 调用服务：更新任务列表 -> 成功：发起“更新成功"信号
    @Effect()
    updateTask$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.UPDATE)
        .map(toPayload)
        .switchMap( task => this.service$.update(task)
            .map(t => new actions.UpdateSuccessAction(t))
            .catch(err => Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))
        );
    //                                                  -> 失败： 发起“删除失败”信号
    // 删除任务列表流：捕获"删除"信号 -> 调用服务：删除项目 -> 成功：发起“删除成功"信号
    @Effect()
    deleteTask$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.DELETE)
        .map(toPayload)
        .switchMap( task => this.service$.del(task)
            .map( t => new actions.DeleteSuccessAction(t))
            .catch(err => Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))
        );
    // 完成任务的流程
    @Effect()
    complete$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.COMPLETE)
        .map(toPayload)
        .switchMap( task => this.service$.complete(task)
            .map( t => new actions.CompleteSuccessAction(t))
            .catch(err => Observable.of(new actions.CompleteFailAction(JSON.stringify(err))))
        );
    //                                    -> 失败： 发起 “交换失败信号”
    // 交换任务列表顺序流：捕获"交换"信号 -> 调用服务"：交换顺序 -> 成功：发起“交换成功"信号
    @Effect()
    move$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.MOVE)
        .map(toPayload)
        .switchMap( ({taskId, taskListId}) => this.service$.move(taskId, taskListId)
            .map(task => new actions.MoveSuccessAction(task))
            .catch(err => Observable.of(new actions.MoveFailAction(JSON.stringify(err))))
        );

    @Effect()
    moveAll$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.MOVE_ALL)
        .map(toPayload)
        .switchMap( ({srcListId, targetListId}) => this.service$.moveAll(srcListId, targetListId)
            .map(tasks => new actions.MoveAllSuccessAction(tasks))
            .catch(err => Observable.of(new actions.MoveAllFailAction(JSON.stringify(err))))
        );
    constructor (
        private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private service$: TaskService,
    ) { }
}
