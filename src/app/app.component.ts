
import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  darkTheme = false;
  constructor(private oc: OverlayContainer) { }
  switchTheme(checked: boolean) {
    console.log(checked);
    this.darkTheme = checked;
    this.oc.getContainerElement().classList.add('myapp-dark-theme');
  }
}
