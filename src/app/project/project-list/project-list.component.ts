
/**
 * 2017.10.08 修改注入 ProjectService 来得到 项目列表的后台接口
 *    - projects = service.get
 * 2017.10.09 项目的增删改查全部调用 service 数据流接口，使用模拟数据
 *    - 引入了 lodash 库，生成范围索引，引入项目图片选择
 *    - 增加缩略图和原图链接地址转换函数
 * 2017.10.10 完善邀请成员的按钮功能，传入成员组到对话框组件，返回成员组（如果新增的话）
 */

import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewPorjectComponent } from '../new-porject/new-porject.component';
import { InvateComponent } from '../invate/invate.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim';
import { ProjectService } from 'app/services/project.service';
import * as _ from 'lodash';
import { Project } from '../../domain/project.model';
import { Subscription } from 'rxjs/Subscription';

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
  projects = [];
  sub: Subscription;
  constructor(private dialogService: MdDialog, private projectService: ProjectService) { }

  ngOnInit() {
    this.sub = this.projectService.get('1').subscribe(projects => this.projects = projects);
  }
  // 组件卸载时取消项目列表的订阅
  ngOnDestroy() {
    this.sub.unsubscribe();
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
      .map(p => ({...p, coverImg: this.buildImgSrc(p.coverImg)}))
      .switchMap(project => this.projectService.add(project))
      .subscribe(addedProject => this.projects = [...this.projects, addedProject]);
  }
  // 打开邀请组成员对话框
  openInvateDialog() {
    this.dialogService.open(InvateComponent, {data: {members: []}});
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
      .switchMap(toUpdateProject => this.projectService.update(toUpdateProject))
      .subscribe(updatedProject => {
        const index = this.projects.map(p => p.id).indexOf(project.id);
        this.projects = [...this.projects.slice(0, index), updatedProject, ...this.projects.slice(index + 1)];
      });
  }
  // 确认是否删除项目
  openConfirmDeleteProjectDialog(project) {
    const confirmDialogRef = this.dialogService.open(ConfirmDialogComponent);
    confirmDialogRef.afterClosed().take(1)
      .filter(_ => _)
      .switchMap(_ => this.projectService.del(project))
      .subscribe(result => {
        console.log(result);
        this.projects = this.projects.filter(p => p.id !== project.id);
      });
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
