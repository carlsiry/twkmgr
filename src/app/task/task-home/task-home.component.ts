
/**
 * 2017.10.14 删除写死的数据处理，从状态树中获取数据
 * 2017.10.16 完善了对任务的操作处理函数
 * 2017.10.25 修改了添加任务列表的错误和获取项目ID的路由方法
 */
import { Component, OnInit, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { slideToRight } from '../../anims/router.anim';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TaskList } from '../../domain/task-list.model';
import * as actions from '../../actions/task-list.action';
import * as taskActions from '../../actions/task.action';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [
    slideToRight
  ]
})
export class TaskHomeComponent implements OnInit {

  @HostBinding('@routeAnim') state;
  projectId$: Observable<string>;
  lists$: Observable<TaskList[]>;

  constructor(
    private dialog: MatDialog,
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
  ) {
    this.projectId$ = this.route.paramMap.map(p => p.get('id'));
    this.lists$ = this.store.select(fromRoot.getTasksByLists);
  }

  ngOnInit() {
  }
  // 打开新建任务对话框
  openAddNewTaskDialog(list) {
    const user$ = this.store.select(fromRoot.getAuthState).map(auth => auth.user);
    user$.take(1)
      .map(user => this.dialog.open(NewTaskComponent, {data: {title: '新建任务', owner: user}}))
      .switchMap(dialogRef => dialogRef.afterClosed().take(1).filter(n => n))
      .subscribe(val => this.store
        .dispatch(new taskActions.AddAction({
          ...val,
          taskListId: list.id,
          completed: false,
          createDate: new Date()
        }))
      );
  }
  // 打开移动所有任务到其他列表的对话框
  openMoveAllTaskDialog(list) {
    this.lists$.map(l => l.filter(n => n.id !== list.id))
    .map(li => this.dialog.open(CopyTaskComponent, {data: {lists: li}}))
    .switchMap(dialogRef => dialogRef.afterClosed().take(1).filter(n => n))
    .subscribe((val: string) => this.store.dispatch(new taskActions.MoveAllAction({
      srcListId: list.id,
      targetListId: val
    })));
  }
  openUpdateListDialog(list: TaskList) {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: '修改列表名称', listName: list.name}})
    dialogRef.afterClosed().take(1)
      .subscribe(result => this.store.dispatch(new actions.UpdateAction({...result, id: list.id})));
  }
  openConfirmDeleteDialog(list: TaskList) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().take(1).filter(_ => _)
      .subscribe(result => this.store.dispatch(new actions.DeleteAction(list)));
  }
  openUpdateTaskDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: '修改任务', task}})
    dialogRef.afterClosed().take(1).filter(_ => _)
      .subscribe(val => this.store.dispatch(new taskActions.UpdateAction({...task, ...val})))
  }
  // 新建任务列表
  openNewTaskListDialog(ev: Event) {
    const dialog = this.dialog.open(NewTaskListComponent, {data: {title: '新建任务列表'}})
    dialog.afterClosed().take(1).filter(_ => _)
      .withLatestFrom(this.projectId$, (val, projectId) => ({...val, projectId}))
      .subscribe(result => {
        console.log(result);
        return this.store.dispatch(new actions.AddAction(result))});
  }

  addQuickTask(desc: string, list) {
    const user$ = this.store.select(fromRoot.getAuthState).map(auth => auth.user);
    user$.take(1)
      .subscribe(user => this.store.dispatch(new taskActions.AddAction({
        desc,
        priority: 3,
        taskListId: list.id,
        owerId: user.id,
        completed: false,
        createDate: new Date(),
        participantIds: []
      })));
  }
}
