/**
 * 2017.10.08 移除无需的导入模块, 迁移 图片列表选择组件表单 至共享模块中
 */
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    LoginRoutingModule,
    SharedModule
  ],
  declarations: [ LoginComponent, RegisterComponent]
})
export class LoginModule { }
