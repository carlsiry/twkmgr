
/**
 * 2017.10.08 创建 项目服务 ---Carlsiry
 *    包含 CRUD 项目 等功能
 */
import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Project } from '../domain';
import { Observable } from 'rxjs/Observable';

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
    const delTasks$ = Observable.from(project.taskLists)
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
}
