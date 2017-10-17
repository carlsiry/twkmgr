
/**
 * 2017.10.08 创建 项目服务 ---Carlsiry
 *    包含 CRUD 项目 等功能
 * 2017.10.09 修复删除项目功能：没有任务列表的项目，订阅流出现问题
 * 2017.10.13 新增邀请服务的功能实现
 * 2017.10.16 修复邀请成员对话框中删除选择的成员提交信息不成功的问题
 *    - 原来是只能增加，现在可以增加删除
 */
import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Project } from '../domain';
import { Observable } from 'rxjs/Observable';
import { User } from '../domain/user.model';
import * as _ from 'lodash';

@Injectable()
export class ProjectService {

  private readonly domain = 'projects';
  headers = new Headers({
    'Content-Type': 'application/json'
  });
  constructor(private http: Http, @Inject('BASE_CONFIG') private config) { }

  // POST 增加项目
  add(project: Project): Observable<Project> {
    project.id = null;
    const url = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(url, JSON.stringify(project), {headers: this.headers})
      .map(res => res.json());
  }
  // PUT 更新项目：通过patch 方法只更新需要更新的
  update(project: Project): Observable<Project> {
    const url = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg
    };
    return this.http
      .patch(url, JSON.stringify(toUpdate), {headers: this.headers})
      .map(res => res.json());
  }
  // DELETE 删除项目：三级级联关系—— 项目-任务列表-任务
  del(project: Project): Observable<Project> {
    // 删除任务列表的流
    const delTasks$ = Observable.from(project.taskLists ? project.taskLists : [])
      .mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`))
      .count();
    // 删除项目的流
    return delTasks$
      .switchMap(_ => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`))
      .mapTo(project);
  }
  // GET 获取项目列表
  get(userId: string): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'members_like': userId}})
      .map(res => res.json() as Project[]);
  }
  // 邀请成员
  invite(projectId: string, users: User[]): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${projectId}`;
    const invitedIds = users.map(user => user.id);
    return this.http.get(uri)
      .map(res => res.json())
      .switchMap((project: Project) => {
        return this.http.patch(uri, JSON.stringify({members: invitedIds}), {headers: this.headers})
          .map(res => res.json());
      });
  }
}
