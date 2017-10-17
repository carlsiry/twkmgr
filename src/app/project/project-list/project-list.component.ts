
/**
 * 2017.10.08 修改注入 ProjectService 来得到 项目列表的后台接口
 *    - projects = service.get
 * 2017.10.09 项目的增删改查全部调用 service 数据流接口，使用模拟数据
 *    - 引入了 lodash 库，生成范围索引，引入项目图片选择
 *    - 增加缩略图和原图链接地址转换函数
 * 2017.10.10 完善邀请成员的按钮功能，传入成员组到对话框组件，返回成员组（如果新增的话）
 * 2017.10.13 更改使用 redux 管理项目状态
 *      10.14 选择项目跳转至项目的任务列表
 * 2017 10.16 修复邀请成员用户不能正确获取成员信息的问题
 *    - 推送流被打断 -> megerMap
 */

// #region importer
import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewPorjectComponent } from '../new-porject/new-porject.component';
import { InvateComponent } from '../invate/invate.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim';
import { ProjectService } from 'app/services/project.service';
import * as _ from 'lodash';
import { Project } from '../../domain/project.model';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { Observable } from 'rxjs/Observable';
import * as actions from '../../actions/project.action';
// #endregion

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    slideToRight,
    listAnimation
  ]
})
export class ProjectListComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnim') state;
  projects$: Observable<Project[]>;
  listAnim$: Observable<number>;
  constructor(
    private dialogService: MatDialog,
    private store$: Store<fromRoot.State>
  ) {
    this.store$.dispatch(new actions.LoadAction(null));
    this.projects$ = this.store$.select(fromRoot.getProjects);
    this.listAnim$ = this.projects$.map(projects => projects.length);
  }

  ngOnInit() {
  }
  // 组件卸载时取消项目列表的订阅
  ngOnDestroy() {
  }
  // 新建项目
  openNewProjectDialog() {
    const selectedImg = `assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const newProjectDialogRef = this.dialogService.open(
        NewPorjectComponent,
        {data: {thumbnails: this.getThumbnails(), img: selectedImg}}
    );
    newProjectDialogRef.afterClosed().take(1)
      .filter(_ => _)
      .map(project => ({...project, coverImg: this.buildImgSrc(project.coverImg)}))
      .subscribe(p => {
        this.store$.dispatch(new actions.AddAction(p));
      });
  }
  // 打开邀请组成员对话框
  openInvateDialog(project: Project) {
    this.store$.select(fromRoot.getProjectUsers(project.id))
      .map(users => this.dialogService.open(InvateComponent, {data: {members: users}}))
      .take(1)
      .switchMap(dialogRef => dialogRef.afterClosed().take(1).filter(_ => _))
      .subscribe(val => this.store$.dispatch(new actions.InviteAction({projectId: project.id, members: val})));
  }
  // 打开更新项目对话框
  openUpdateProjectDialog(project: Project) {
    const newProjectDialogRef = this.dialogService.open(
        NewPorjectComponent,
        {data: {project: project, thumbnails: this.getThumbnails()}}
    );
    newProjectDialogRef.afterClosed().take(1)
      .filter(_ => _)
      .map(p => ({...p, id: project.id, coverImg: this.buildImgSrc(p.coverImg)}))
      .subscribe(toUpdateProject => {
        this.store$.dispatch(new actions.UpdateAction(toUpdateProject));
      });
  }
  // 确认是否删除项目
  openConfirmDeleteProjectDialog(project) {
    const confirmDialogRef = this.dialogService.open(ConfirmDialogComponent);
    confirmDialogRef.afterClosed().take(1)
      .filter(_ => _)
      .subscribe(result => {
        this.store$.dispatch(new actions.DeleteAction(project));
      });
  }
  // 触发选择项目到任务列表
  onSelectedProject(project) {
    this.store$.dispatch(new actions.SelectProjectAction(project));
  }
  // 生成40张项目图片的缩略图链接地址
  private getThumbnails() {
    return _.range(0, 40).map(i => `assets/img/covers/${i}_tn.jpg`);
  }
  // 将缩略图装换为原图的链接地址
  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img;
  }

}
