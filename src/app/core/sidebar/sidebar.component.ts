import { Component, OnInit } from '@angular/core';
import { getDate } from 'date-fns';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  day = 'day';
  constructor() { }

  ngOnInit() {
    this.day = `day${getDate(new Date())}`;
    console.log(this.day);
  }

}
