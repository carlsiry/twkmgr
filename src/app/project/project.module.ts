import { NgModule } from '@angular/core';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { NewPorjectComponent } from './new-porject/new-porject.component';
import { InvateComponent } from './invate/invate.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [ProjectListComponent, ProjectItemComponent, NewPorjectComponent, InvateComponent],
  entryComponents: [
    NewPorjectComponent,
    InvateComponent
  ]
})
export class ProjectModule { }
