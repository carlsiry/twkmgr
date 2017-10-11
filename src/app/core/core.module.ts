/**
 *
 * 2017.09.30 Carlsiry
 * 0. 创建单例的核心模块：SkipSelf, Optional
 * 1. 注册导入整合整个应用中分散的需要用到的资源 : MdIconRegistry, DomSanitizer, loadSvgResources
 *
 * 2017.10.03 Carlsiry
 * 1. 从 共享模块 中导入核心模块需要用到的一些常用模块
 * 2. 导入导出 整个应用的路由模块（AppRoutingModule）
 * 3. 直接导出 BrowserModule BrowserAnimationsModule 浏览器支持相关的模块（到根模块中，根模块结构非简洁）
 * 4. 导出 MdSidenavModule 用于根模块中设置侧边导航栏
 *
 * 2017.10.08 Carlisry
 *  - 导入服务模块
 */

import { NgModule, SkipSelf, Optional } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MatIconRegistry, MatSidenavModule } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser'
import { loadSvgResources } from '../utils/svg.util';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/do';
import { ServicesModule } from '../services/services.module';

@NgModule({
  imports: [
    SharedModule,
    AppRoutingModule,
    ServicesModule,
  ],
  declarations: [HeaderComponent, SidebarComponent, FooterComponent],
  exports: [
    AppRoutingModule,
    MatSidenavModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
  providers: [
    {
      provide: 'BASE_CONFIG',
      useValue: { uri: 'http://localhost:3000' }
    }
  ],
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    // 跳过导入本模块新实例，从父模块中找实例，找不到就算了（可选）
    iconRegisgry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    if (parent) {
      throw new Error('核心模块已经存在，不能再次加载！');
    }
    // 加载svg资源
    loadSvgResources(iconRegisgry, sanitizer);
  }
}
