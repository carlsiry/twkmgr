
/**
 * 2017.10.08 创建服务模块，用于提供整个项目的接口服务
 *  - 提供 项目接口服务
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService} from './project.service';

@NgModule({
  providers: [
    ProjectService
  ]
})
export class ServicesModule { }
