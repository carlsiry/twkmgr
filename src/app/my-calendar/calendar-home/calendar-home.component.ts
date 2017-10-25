
/**
 * 2017.10.25 添加 日程组件
 */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { TaskService } from '../../services/task.service';
import * as fromRoot from '../../reducers';
import { Store } from '@ngrx/store';
import { startOfDay, endOfDay } from 'date-fns';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#fae3e3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#d1e8ff'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

const getColor = (priority: number) => {
  switch (priority) {
    case 1:
      return colors.red;
    case 2:
      return colors.blue;
    default:
      return colors.yellow;
  }
};

@Component({
  selector: 'app-calendar-home',
  templateUrl: './calendar-home.component.html',
  styleUrls: ['./calendar-home.component.scss']
})
export class CalendarHomeComponent implements OnInit {

  // 日历组件的基准日期
  viewDate: Date;
  // 日历组件的视图类型
  view$: Observable<string>;
  events$: Observable<CalendarEvent[]>;
  constructor(
    private route: ActivatedRoute,
    private store$: Store<fromRoot.State>,
    private service$: TaskService
  ) {
    // 当前日期
    this.viewDate = new Date();
    // 根据路由中的参数值来决定日历组件的视图类型是哪种
    this.view$ = this.route.paramMap.map(p => p.get('view'));
    // 根据 store 中的 认证状态值来 获取用户的所有任务，通过任务信息来封装 日历事件们
    this.events$ = this.store$.select(fromRoot.getAuthState)
      .map(auth => auth.user.id)
      .switchMap(userId => this.service$.getUserTasks(userId))
      .map(tasks => tasks.map(task => ({
        start: task.createDate,
        end: task.dueDate,
        title: task.desc,
        color: getColor(task.priority)
      })));
  }

  ngOnInit() {
  }

}
