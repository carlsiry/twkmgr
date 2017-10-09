
/**
 * 2017.10.08 创建服务模块，用于提供整个项目的接口服务
 *  - 提供 项目接口服务
 * 2017.10.09 下午 逸夫楼 -- Carlsiry 
 *  - 添加用户服务，提供跟用户相关的项目增删改查
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from './project.service';
import { TaskListService } from './task-list.service';
import { TaskService } from './task.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@NgModule({
  providers: [
    ProjectService,
    TaskListService,
    TaskService,
    UserService,
    AuthService,
  ]
})
export class ServicesModule { }
