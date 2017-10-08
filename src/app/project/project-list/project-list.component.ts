
/**
 * 2017.10.08 修改注入 ProjectService 来得到 项目列表的后台接口
 *    - projects = service.get
 */

import { Component, OnInit, HostBinding } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewPorjectComponent } from '../new-porject/new-porject.component';
import { InvateComponent } from '../invate/invate.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim';
import { ProjectService } from 'app/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    slideToRight,
    listAnimation
  ]
})
export class ProjectListComponent implements OnInit {

  @HostBinding('@routeAnim') state;
  projects = [];

  constructor(private dialogService: MdDialog, private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.get('1').subscribe(projects => this.projects = projects);
  }
  openNewProjectDialog() {
    const newProjectDialogRef = this.dialogService.open(NewPorjectComponent, {data: {title: '新建项目'}});
    newProjectDialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.projects = [...this.projects,
        {id: 4, name: 'carl', desc: 'welcome to China', coverImg: 'assets/img/covers/3.jpg'},
        {id: 5, name: 'carl', desc: 'welcome to China', coverImg: 'assets/img/covers/5.jpg'}
      ];
    });
  }
  openInvateDialog() {
    this.dialogService.open(InvateComponent);
  }
  openUpdateProjectDialog() {
    this.dialogService.open(NewPorjectComponent, {data: {title: '修改项目'}})
  }
  openConfirmDeleteProjectDialog(project) {
    const confirmDialogRef = this.dialogService.open(ConfirmDialogComponent);
    confirmDialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter(p => p.id !== project.id);
    });
  }

}
