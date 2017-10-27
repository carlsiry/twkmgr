
/**
 * 2017.10.26 修复快速新建任务可以为空的问题
 */
import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-quick-task',
  templateUrl: './quick-task.component.html',
  styleUrls: ['./quick-task.component.scss']
})
export class QuickTaskComponent implements OnInit {

  @Output() quickTask = new EventEmitter<string>();
  desc: string;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('keyup.enter')
  onClickSendQuickTask() {
    if (this.desc) {
      this.quickTask.emit(this.desc);
    }
    this.desc = '';
  }

}
