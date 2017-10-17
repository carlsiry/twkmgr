/**
 * 2017.10.17 Carlisry 逸夫楼 移除不需要的测试代码
 */

import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { trigger, state, transition, style, animate} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  darkTheme = false;
  squareState: string;

  constructor(private oc: OverlayContainer) { }

  switchTheme(checked: boolean) {
    console.log(checked);
    this.darkTheme = checked;
    this.oc.getContainerElement().classList.add('myapp-dark-theme');
  }
}
