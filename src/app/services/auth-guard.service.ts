
/**
 * 2017.10.09 晚上 逸夫楼 -- Carlsiry
 *  - 创建 认证路由守卫
 * 2017.10.11 下午 逸夫楼 -- Carlsiry
 *  - 根据 认证 的状态来决定是否守卫路由
 * 2017.10.25 修复路由守卫是否守卫的错误 if (!result)
 */
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import { getAuthState } from '../reducers/index';
import { go } from '@ngrx/router-store';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private store$: Store<fromRoot.State>) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store$.select(getAuthState)
      .map(auth => {
        const result = auth.token !== null && auth.token !== undefined;
        if (!result) {
          this.store$.dispatch(go(['/login']));
        }
        return result;
      })
      .defaultIfEmpty(false);
  }


}
