
/**
 * 2017.10.14 修改了调整到任务列表组件的路由命名方式
 * 2017.10.25 使用路由懒加载，把路由参数迁移到了app-rougint.module路由组件
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskHomeComponent } from './task-home/task-home.component';

const routes: Routes = [
    { path: '', component: TaskHomeComponent}
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskRoutingModule { }
