
/**
* 2017.10.25 使用路由懒加载，把路由参数迁移到了app-rougint.module路由组件
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';

const routes: Routes = [
    { path: '', component: ProjectListComponent}
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectRoutingModule {}
