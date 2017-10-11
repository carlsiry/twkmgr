
/**
 * 2017.09.30 Carlsiry
 * 0. 创建共享模块
 *
 * 2017.10.03 Carlsiry
 * 1. 只导入 ConfirmDialogComponent 中要用到的模块
 * 2. 导出 所有在很多模块中都要用到的模块
 *
 * 2017.10.08 Carlsiry 从 登录模块 迁移了 图片列表选择组件表单
 * 2017.10.10 Carlsiry 引入了 自动建议选择条表单控件
 * 2017.10.10 Carlsiry 引入 自动完成模块、选中条模块 - chipListComponent
 * 2017.10.11 Carlsiry 加入选项卡样式组件，增加了身份、地址自定义控件
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatToolbarModule, MatSlideToggleModule, MatListModule, MatIconModule, MatButtonModule,
  MatInputModule, MatCardModule, MatGridListModule, MatDialogModule, MatAutocompleteModule, MatMenuModule,
  MatCheckboxModule, MatTooltipModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule,
  MatSelectModule, MatButtonToggleModule, MatChipsModule, MatTabsModule
} from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DirectiveModule } from '../directive/directive.module';
import { AgeInputComponent } from './age-input/age-input.component';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { ChipsListComponent } from './chips-list/chips-list.component';
import { IdentityInputComponent } from './identity-input/identity-input.component';
import { AreaListComponent } from './area-list/area-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatGridListModule,
    MatDatepickerModule, // shareModule 中 age-input中用到，如果这个组件调整到其他模块，记得删除
    MatChipsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
  ],
  exports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ConfirmDialogComponent,
    DirectiveModule,
    AgeInputComponent, // 年龄选择控件
    ImageListSelectComponent,
    ChipsListComponent,
    IdentityInputComponent,
    AreaListComponent,
  ],
  declarations: [
    ConfirmDialogComponent,
    AgeInputComponent,
    ImageListSelectComponent,
    ChipsListComponent,
    IdentityInputComponent,
    AreaListComponent,
  ]
})
export class SharedModule { }
