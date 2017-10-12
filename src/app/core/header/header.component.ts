
/**
 * 2017.10.11 使用 redux 的获取用户认证状态来控制是否显示相关按钮，增加退出认证功能
 */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as fromRoot from '../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Auth } from '../../domain/auth.model';
import { getAuthState } from '../../reducers/index';
import * as authAction from '../../actions/auth.action';
import { LogoutAction } from '../../actions/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  auth$: Observable<Auth>;
  @Output() toggle = new EventEmitter<void>();
  @Output() toggleDarkTheme = new EventEmitter<boolean>();
  constructor(private store$: Store<fromRoot.State>) {
    this.auth$ = this.store$.select(getAuthState)
  }

  ngOnInit() {
  }
  openSidenav() {
    this.toggle.emit();
  }
  triggleDarkTheme(checked: boolean) {
    console.log(checked);
    this.toggleDarkTheme.emit(checked);
  }
  logout() {
    this.store$.dispatch(new authAction.LogoutAction(null));
  }
}
