
/**
 * 2017.10.09 创建 认证服务 ---Carlsiry
 *  - 注册、登录
 * 2017.10.11 删除注册函数中的重置用户ID的代码(user.id = null)，因为状态中用户值是不可更改
 */
import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../domain/user.model';
import { Auth } from '../domain/auth.model';

@Injectable()
export class AuthService {

  private readonly domain = 'users';
  headers = new Headers({
    'Content-Type': 'application/json'
  });
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
    '.eyJpc3MiOiJuaW5naGFvLm5ldCIsImV4cCI6IjE0Mzg5NTU0NDUiLCJuYW1lIjoid2FuZ2hhbyIsImFkbWluIjp0cnVlfQ' +
    '.SwyHTEx_RQppr97g4J5lKXtabJecpejuef8AqKYMAJc';
  constructor(private http: Http, @Inject('BASE_CONFIG') private config) { }

  // 注册
  register(user: User): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'email': user.email}})
      .switchMap(res => {
        if (res.json() > 0) {
          throw new Error('user existed');
        }
        return this.http.post(uri, JSON.stringify(user), {headers: this.headers})
          .map(r => ({token: this.token, user: r.json()}));
      });
  }
  // 登录
  login(username: string, password: string): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {username, password}})
      .map(res => {
        if (res.json().length === 0) {
          throw new Error('username or password not match');
        }
        return {
          token: this.token,
          user: res.json()[0]
        };
      });
  }
}
