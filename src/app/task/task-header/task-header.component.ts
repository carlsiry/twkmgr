import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {

  @Input() header = '';
  @Output() addNewTask = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }
  // 发射 新任务 事件 到 taskHome 组件当中
  onClickNewTask() {
    this.addNewTask.emit();
  }

}
