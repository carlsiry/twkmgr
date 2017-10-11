
/**
 * 2017.10.11 开始使用 redux
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../domain/quote.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/quote.action';

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
    private quoteService$: QuoteService,
    private store$: Store<fromRoot.State>
  ) {
    this.quote$ = this.store$.select(state => state.quote.quote);
    this.quoteService$.getQuote()
      .subscribe(q => {
        this.store$.dispatch({type: actions.QUOTE_SUCCESS, payload: q})
      })
  }

  ngOnInit() {
  }
  // 自己处理表单提交事件
  onSubmit({value, valid}, ev: Event) {
    console.log(value);
    console.log(valid);
  }
}
