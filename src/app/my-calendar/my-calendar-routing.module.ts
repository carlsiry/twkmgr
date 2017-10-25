
/**
 * 2017.10.25 添加 日历视图组件用于 显示对应时间是否用的任务的组件
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarHomeComponent } from './calendar-home/calendar-home.component';

const routes: Routes = [
    { path: '', component: CalendarHomeComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyCAlendarRoutingModule { }
