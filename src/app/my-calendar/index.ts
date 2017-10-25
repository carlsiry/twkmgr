
/**
 * 2017.10.25 继续完成这个模块
 */
import { NgModule } from '@angular/core';
import { CalendarHomeComponent } from './calendar-home/calendar-home.component';
import { SharedModule } from '../shared/shared.module';
import { CalendarModule } from 'angular-calendar';
import { MyCAlendarRoutingModule } from './my-calendar-routing.module';

@NgModule({
  imports: [
    CalendarModule.forRoot(),
    MyCAlendarRoutingModule,
    SharedModule, // 使用了共享模块中的 MatcardModule  中的卡片布局组件
  ],
  declarations: [CalendarHomeComponent]
})
export class MyCalendarModule { }
