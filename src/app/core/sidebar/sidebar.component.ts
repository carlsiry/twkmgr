
/**
 * 2017.10.25 获取用户的项目列表 添加到侧边栏视图中
 */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { getDate } from 'date-fns';
import { Project } from '../../domain/project.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { Observable } from 'rxjs/Observable';
import * as actions from '../../actions/project.action';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  projects$: Observable<Project[]>;
  day = 'day';
  @Output() clickNav = new EventEmitter<void>();

  constructor(private store$: Store<fromRoot.State>) {
    this.projects$ = store$.select(fromRoot.getProjects);
  }

  ngOnInit() {
    this.day = `day${getDate(new Date())}`;
  }

  onClickNav() {
    this.clickNav.emit();
  }
  // 点击对应的项目名字发起选择项目的信号
  onPrjClick(prj: Project) {
    this.store$.dispatch(new actions.SelectProjectAction(prj));
  }

}
