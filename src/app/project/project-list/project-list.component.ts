
import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewPorjectComponent } from '../new-porject/new-porject.component';
import { InvateComponent } from '../invate/invate.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects = [
    {
      name: '一个项目噢',
      desc: '这个一个团队项目',
      coverImg: 'assets/img/covers/0.jpg'
    },
    {
      name: '又一个项目噢',
      desc: '这个一个团队项目',
      coverImg: 'assets/img/covers/1.jpg'
    },
    {
      name: '又一个项目噢',
      desc: '这个一个团队项目',
      coverImg: 'assets/img/covers/1.jpg'
    },
  ];

  constructor(private dialogService: MdDialog) { }

  ngOnInit() {
  }
  openNewProjectDialog() {
    const newProjectDialogRef = this.dialogService.open(NewPorjectComponent, {data: {title: '新建项目'}});
    newProjectDialogRef.afterClosed().subscribe(result => console.log(result));
  }
  openInvateDialog() {
    this.dialogService.open(InvateComponent);
  }
  openUpdateProjectDialog() {
    this.dialogService.open(NewPorjectComponent, {data: {title: '修改项目'}})
  }
  openConfirmDeleteProjectDialog() {
    this.dialogService.open(ConfirmDialogComponent);
  }

}
