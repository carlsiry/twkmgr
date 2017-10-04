
import { Component, OnInit, HostBinding } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewPorjectComponent } from '../new-porject/new-porject.component';
import { InvateComponent } from '../invate/invate.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim';

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
  projects = [
    {
      id: 1,
      name: '一个项目噢',
      desc: '这个一个团队项目',
      coverImg: 'assets/img/covers/0.jpg'
    },
    {
      id: 2,
      name: '一个项目噢',
      desc: '这个一个团队项目',
      coverImg: 'assets/img/covers/0.jpg'
    },
    {
      id: 3,
      name: '又一个项目噢',
      desc: '这个一个团队项目',
      coverImg: 'assets/img/covers/1.jpg'
    }
  ];

  constructor(private dialogService: MdDialog) { }

  ngOnInit() {
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
