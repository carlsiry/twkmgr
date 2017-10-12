
/**
 * 2017.10.11 开始使用 redux
 * 2017.10.12 使用 Effect 来获取服务器数据、登录壮态
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../domain/quote.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as quoteActions from '../../actions/quote.action';
import * as authActions from '../../actions/auth.action';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  quote$: Observable<Quote>;
  // 自定义表单
  loginForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private store$: Store<fromRoot.State>
  ) {
    this.quote$ = this.store$.select(fromRoot.getQuote);
    this.store$.dispatch(new quoteActions.LoadAction(null));
  }

  ngOnInit() {
  }
  // 自己处理表单提交事件
  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    // 如果验证没问题
    this.store$.dispatch(new authActions.LoginAction(value))
  }
}
