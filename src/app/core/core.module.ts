/**
 * 2017.09.30 Carlsiry
 * 0. 创建单例的核心模块
 */

import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser'
import { loadSvgResources } from '../utils/svg.util';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [HeaderComponent, SidebarComponent, FooterComponent],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    iconRegisgry: MdIconRegistry,
    sanitizer: DomSanitizer
  ) {
    if (parent) {
      throw new Error('核心模块已经存在，不能再次加载！');
    }
    // 加载svg资源
    loadSvgResources(iconRegisgry, sanitizer);
  }
}
