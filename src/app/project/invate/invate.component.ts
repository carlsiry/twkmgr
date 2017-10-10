
/**
 * 2017.10.10 逸夫楼 Carlsiry
 *    加入视图模型 members 和 对话框表单提交处理行数
 */
import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-invate',
  templateUrl: './invate.component.html',
  styleUrls: ['./invate.component.scss']
})
export class InvateComponent implements OnInit {

  // 承载项目已经存在和新增的成员 10.10
  members = [];

  constructor(@Inject(MD_DIALOG_DATA) private data, private dialogRef: MdDialogRef<InvateComponent>) { }

  ngOnInit() {
    this.members = [...this.data.members];
  }
  // 表单提交时如果成员为空直接结束，不为空则把成员数组传回项目列表组件中
  onSubmit(ev: Event, {value, valid}) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(this.members);
  }
}
