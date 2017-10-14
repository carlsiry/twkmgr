
/**
 * 2017.10.14 修改了调整到任务列表组件的路由命名方式
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskHomeComponent } from './task-home/task-home.component';

const routes: Routes = [
    { path: 'tasklists/:id', component: TaskHomeComponent}
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskRoutingModule { }
