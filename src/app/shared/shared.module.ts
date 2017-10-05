
/**
 * 2017.09.30 Carlsiry
 * 0. 创建共享模块
 *
 * 2017.10.03 Carlsiry
 * 1. 只导入 ConfirmDialogComponent 中要用到的模块
 * 2. 导出 所有在很多模块中都要用到的模块
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdToolbarModule, MdSlideToggleModule, MdListModule, MdIconModule, MdButtonModule,
  MdInputModule, MdCardModule, MdGridListModule, MdDialogModule, MdAutocompleteModule, MdMenuModule,
  MdCheckboxModule, MdTooltipModule, MdRadioModule, MdDatepickerModule, MdNativeDateModule,
  MdSelectModule,
} from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DirectiveModule } from '../directive/directive.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdIconModule,
    MdButtonModule,
    MdDialogModule,
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
  ],
  declarations: [ConfirmDialogComponent]
})
export class SharedModule { }
