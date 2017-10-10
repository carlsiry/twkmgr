
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
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdToolbarModule, MdSlideToggleModule, MdListModule, MdIconModule, MdButtonModule,
  MdInputModule, MdCardModule, MdGridListModule, MdDialogModule, MdAutocompleteModule, MdMenuModule,
  MdCheckboxModule, MdTooltipModule, MdRadioModule, MdDatepickerModule, MdNativeDateModule,
  MdSelectModule, MdButtonToggleModule, MdChipsModule,
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
    MdIconModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdDialogModule,
    MdGridListModule,
    MdDatepickerModule, // shareModule 中 age-input中用到，如果这个组件调整到其他模块，记得删除
    MdChipsModule,
    MdAutocompleteModule,
    MdInputModule,
    MdSelectModule,
  ],
  exports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdRadioModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSelectModule,
    ConfirmDialogComponent,
    DirectiveModule,
    AgeInputComponent, // 年龄选择控件
    ImageListSelectComponent,
    ChipsListComponent,
  ],
  declarations: [ConfirmDialogComponent, AgeInputComponent, ImageListSelectComponent, ChipsListComponent, IdentityInputComponent, AreaListComponent]
})
export class SharedModule { }
