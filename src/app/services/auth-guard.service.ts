
/**
 * 2017.10.09 晚上 逸夫楼 -- Carlsiry
 *  - 创建 认证路由守卫
 */
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return Observable.of(true);
  }

  constructor() { }

}
