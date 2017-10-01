
/**
 * 2017.09.30 Carlsiry
 * 0. 创建共享模块
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdToolbarModule, MdSlideToggleModule, MdListModule, MdIconModule, MdButtonModule,
  MdInputModule, MdCardModule, MdGridListModule} from '@angular/material';

@NgModule({
  imports: [
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
  ],
  declarations: []
})
export class SharedModule { }
