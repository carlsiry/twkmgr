
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  darkTheme = false;
  switchTheme(checked: boolean) {
    console.log(checked);
    this.darkTheme = checked;
  }
}
