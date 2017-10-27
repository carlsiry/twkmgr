
/**
 * 2017.10.26 增加输出任务完成事件用于通知任务完成
 */
import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { taskItemAnim } from '../../anims/taskItem.anim';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [
    taskItemAnim
  ]
})
export class TaskItemComponent implements OnInit {

  @Input() item;
  @Output() updateTask = new EventEmitter<void>();
  @Output() taskCompleted = new EventEmitter<void>();
  avatar: string;
  taskItemState = 'void';

  constructor() { }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.taskItemState = 'hover';
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.taskItemState = 'void';
  }
  ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned';
  }
  onClickCheckbox(ev: Event) {
    ev.stopImmediatePropagation();
  }
  onClickUpdateTask() {
    this.updateTask.emit();
  }
  onCheckboxChanged(ev: Event) {
    console.log('完成任务：');
    this.taskCompleted.emit();
  }
}
