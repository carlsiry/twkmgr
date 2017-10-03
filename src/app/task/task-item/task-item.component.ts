import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() item;
  @Output() updateTask = new EventEmitter<void>();
  avatar: string;
  constructor() { }

  ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned';
  }
  onClickCheckbox(ev: Event) {
    ev.stopImmediatePropagation();
  }
  onClickUpdateTask() {
    this.updateTask.emit();
  }
}
