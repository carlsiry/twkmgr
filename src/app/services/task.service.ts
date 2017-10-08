
/**
 * 2017.10.08 创建 任务的服务 ---Carlsiry
 *    包含 CRUD 任务 等功能
 */

import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Task, TaskList } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskService {

  private readonly domain = 'tasks';
  headers = new Headers({
    'Content-Type': 'application/json'
  });
  constructor(private http: Http, @Inject('BASE_CONFIG') private config) { }

  // POST 增加任务
  add(task: Task): Observable<Task> {
    task.id = null;
    const url = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(url, JSON.stringify(task), {headers: this.headers})
      .map(res => res.json());
  }
  // PUT 更新项目：通过patch 方法只更新需要更新的
  update(task: Task): Observable<Task> {
    const url = `${this.config.uri}/${this.domain}/${task.id}`;
    const toUpdate = { // 单一责任
      desc: task.desc,
      priority: task.priority,
      reminder: task.reminder,
      dueDate: task.dueDate,
      owerId: task.owerId,
      participantIds: task.participantIds,
      remark: task.remark,
    };
    return this.http
      .patch(url, JSON.stringify(toUpdate), {headers: this.headers})
      .map(res => res.json());
  }
  // DELETE 删除任务
  del(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.http.delete(uri).mapTo(task);
  }
  // GET 获取任务列表
  get(taskListId: string): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'taskListId': taskListId}})
      .map(res => res.json() as Task[]);
  }
  // 获取所有的任务
  getByLists(lists: TaskList[]): Observable<Task[]> {
    return Observable.from(lists)
      .mergeMap(list => this.get(list.id))
      .reduce((tasks: Task[], newTasks: Task[]) => [...tasks, ...newTasks], []);
  }
  // 完成任务接口
  complete(task: Task): Observable<Task> {
    const url = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.http
      .patch(url, JSON.stringify({completed: task.completed}), {headers: this.headers})
      .map(res => res.json());
  }
  // 移动单个任务
  move(taskId: string, taskListId: string): Observable<Task> {
    const url = `${this.config.uri}/${this.domain}/${taskId}`;
    return this.http
      .patch(url, JSON.stringify({taskListId: taskListId}), {headers: this.headers})
      .map(res => res.json());
  }
  // 移动所有任务
  moveAll(srcListId: string, targetListId: string): Observable<Task[]> {
    return this.get(srcListId)
      .mergeMap(tasks => Observable.from(tasks))
      .mergeMap(task => this.move(task.id, targetListId))
      .reduce((tasks: Task[], newTask) => [...tasks, newTask], []);
  }
}
