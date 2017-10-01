import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    LoginRoutingModule,
    SharedModule
  ],
  declarations: [ LoginComponent, RegisterComponent ]
})
export class LoginModule { }
