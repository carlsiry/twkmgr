
/**
 * 2017.10.08 创建 任务列表 服务 ---Carlsiry
 *    包含 CRUD 任务列表 等功能
 */
import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TaskList } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskListService {

  private readonly domain = 'taskLists';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  constructor(private http: Http, @Inject('BASE_CONFIG') private config) { }

  // POST 增加任务列表
  add(taskList: TaskList): Observable<TaskList> {
    taskList.id = null;
    const url = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(url, JSON.stringify(taskList), {headers: this.headers})
      .map(res => res.json());
  }
  // PUT 更新任务列表：通过patch 方法只更新需要更新的
  update(taskList: TaskList): Observable<TaskList> {
    const url = `${this.config.uri}/${this.domain}/${taskList.id}`;
    const toUpdate = {
      name: taskList.name,
    };
    return this.http
      .patch(url, JSON.stringify(toUpdate), {headers: this.headers})
      .map(res => res.json());
  }
  // DELETE 删除项目：三级级联关系—— 项目-任务列表-任务
  del(taskList: TaskList): Observable<TaskList> {
    const url = `${this.config.uri}/${this.domain}/${taskList.id}`;
    return this.http.delete(url).mapTo(taskList);
  }
  // GET 获取项目列表
  get(projectId: string): Observable<TaskList[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'projectId': projectId}})
      .map(res => res.json() as TaskList[]);
  }
  swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
    const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
    const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;
    const drag$ = this.http
      .patch(dragUri, JSON.stringify({order: target.oreder}), {headers: this.headers})
      .map(res => res.json());
    const drop$ = this.http
      .patch(dragUri, JSON.stringify({order: src.oreder}), {headers: this.headers})
      .map(res => res.json());
    return Observable.concat(drag$, drop$).reduce((arrs, list) => [...arrs, list], []);
  }
}
