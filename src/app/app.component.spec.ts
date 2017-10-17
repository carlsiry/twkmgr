
/**
 * 2017.10.17 增加了导航栏的界面测试
 */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { MatSidenavModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
    // 准备测试环境, 把需要测试的用例环境准备
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent ],
            imports: [
                CommonModule,
                RouterModule.forRoot([]),
                CoreModule,
                MatSidenavModule,
                BrowserAnimationsModule
            ],
            providers: [
                {
                    provide: APP_BASE_HREF,
                    useValue: '/'
                }
            ]
        }).compileComponents();
    }));
    it('应该创建一个应用', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy(); // 用例运行起来了没有报错应该就是为真的
    }));
    it('应该包含一个.site的元素', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.site')).toBeTruthy();
    }));
});
