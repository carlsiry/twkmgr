
/**
 * 2017.10.12 创建用于 quote 的 effct流
 */
import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect} from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Quote } from '../domain/quote.model';
import { Action } from '@ngrx/store';
import { QuoteService } from '../services/quote.service';
import * as actions from '../actions/quote.action';

@Injectable()
export class QuoteEffects {
    @Effect()
    quoteEffect$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.LOAD)
        .map(toPayload) // map(a => a.payload)
        .switchMap(_ => this.service$.getQuote()
            .map(q => new actions.LoadSuccessAction(q))
            .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
        );
    constructor(private actions$: Actions, private service$: QuoteService) {}
}
