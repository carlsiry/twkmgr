
/**
 * 2017.10.09  下午 实验楼805、逸夫楼 --Carlsiry
 *    创建 用户服务
 *    - 查找用户们
 *    - 获取同一个项目的用户们
 *    - 为用户添加、移除项目
 *    - 批量更新用户添加项目
 */
import { Injectable, Inject } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User, Project } from '../domain';

@Injectable()
export class UserService {

  private readonly domain = 'users';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private http: Http, @Inject('BASE_CONFIG') private config) { }

  // 查找用户们
  searchUsers(filter: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, {params: {'email_like': filter}})
      .map(res => res.json() as User[]);
  }
  // 获取同一个项目的用户们
  getUsersByProject(projectId: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, {params: {'projectId': projectId}})
      .map(res => res.json() as User[]);
  }
  // 为用户添加项目
  addProjectRef(user: User, projectId: string) {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    if (projectIds.indexOf(projectId) > -1) {
      return Observable.of(user);
    }
    return this.http
      .patch(uri, JSON.stringify({projectIds: [...projectIds, projectId]}))
      .map(res => res.json() as User)
  }
  // 为用户移除项目
  removeProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    const index = projectIds.indexOf(projectId);
    if ( index === -1) {
      return Observable.of(user);
    }
    const toUpdate = [...projectIds.slice(0, index), projectIds.slice(index + 1)];
    return this.http
      .patch(uri, JSON.stringify({projectIds: toUpdate}), {headers: this.headers})
      .map(res => res.json() as User)
  }
  // 批量更新用户增加项目
  batchUpdateProjectRef(project: Project): Observable<User[]> {
    const projectId = project.id;
    const memberIds = project.members ? project.members : [];
    return Observable.from(memberIds)
      .switchMap(id => {
        const uri = `${this.config.uri}/${this.domain}/${id}`;
        return this.http.get(uri).map(res => res.json() as User);
      })
      .filter(user => user.projectIds.indexOf(projectId) === -1)
      .switchMap(u => this.addProjectRef(u, projectId))
      .reduce((arr, curr) => [...arr, curr], []);
  }

}
