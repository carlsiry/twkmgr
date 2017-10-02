import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-invate',
  templateUrl: './invate.component.html',
  styleUrls: ['./invate.component.scss']
})
export class InvateComponent implements OnInit {

  items = [
    'One',
    'Two',
    'Three'
  ]

  constructor() { }

  ngOnInit() {
  }
}
