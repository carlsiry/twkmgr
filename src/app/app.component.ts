
import { Component } from '@angular/core';
// import { OverlayContainer } from '@angular/material';
import {OverlayContainer} from '@angular/cdk/overlay';
import { trigger, state, transition, style, animate} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // 为了测试动画写法定义的元数据
  // animations: [
  //   trigger('squareTrigger', [
  //     state('green', style({'background-color': 'red', 'height': '200px'})),
  //     state('red', style({'background-color': 'green'})),
  //     transition('red <=> green', animate(1000)),
  //   ])
  // ]
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
  // 为了测试动画写法的状态转换代码
  // onClick() {
  //   if (this.squareState === 'green') {
  //     this.squareState = 'red';
  //   } else {
  //     this.squareState = 'green';
  //   }
  // }
}
