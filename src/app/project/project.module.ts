import { NgModule } from '@angular/core';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { NewPorjectComponent } from './new-porject/new-porject.component';
import { InvateComponent } from './invate/invate.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectRoutingModule } from './project-routing.module';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule
  ],
  declarations: [ProjectListComponent, ProjectItemComponent, NewPorjectComponent, InvateComponent],
  entryComponents: [
    NewPorjectComponent,
    InvateComponent,
    ConfirmDialogComponent
  ]
})
export class ProjectModule { }
