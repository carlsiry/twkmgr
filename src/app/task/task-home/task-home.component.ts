
/**
 * 2017.10.14 删除写死的数据处理，从状态树中获取数据
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
    private mdDialog: MatDialog,
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
  ) {
    this.projectId$ = this.route.paramMap.pluck('id');
    this.lists$ = this.store.select(fromRoot.getTaskLists);
  }

  ngOnInit() {
  }
  // 打开新建任务对话框
  openAddNewTaskDialog() {
    this.mdDialog.open(NewTaskComponent, {data: {title: '新建任务'}});
  }
  // 打开移动所有任务到其他列表的对话框
  openMoveAllTaskDialog() {
    // this.mdDialog.open(CopyTaskComponent, {data: {lists: this.lists}});
  }
  openUpdateListDialog(list: TaskList) {
    const dialogRef = this.mdDialog.open(NewTaskListComponent, {data: {title: '修改列表名称', listName: list.name}})
    dialogRef.afterClosed().take(1)
      .subscribe(result => this.store.dispatch(new actions.UpdateAction({...result, id: list.id})));
  }
  openConfirmDeleteDialog(list: TaskList) {
    const dialogRef = this.mdDialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().take(1).filter(_ => _)
      .subscribe(result => this.store.dispatch(new actions.DeleteAction(list)));
  }
  openUpdateTaskDialog() {
    console.log('update task');
    this.mdDialog.open(NewTaskComponent, {data: {title: '修改任务'}})
  }
  openNewTaskListDialog(ev: Event) {
    const dialog = this.mdDialog.open(NewTaskListComponent, {data: {title: '新建任务列表'}})
    dialog.afterClosed().take(1).filter(_ => _)
      .subscribe(result => {
        console.log(result);
        return this.store.dispatch(new actions.AddAction(result))});
  }

  addQuickTask(desc: string) {
    console.log(desc);
  }

}
