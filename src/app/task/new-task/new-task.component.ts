
/**
 * 2017.10.16 增加了新增任务的表单
 * 2017.10.27 修复新建任务和更新任务字段不匹配的问题
 */
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  form: FormGroup;
  title: string;
  // 优先级标签属性值：label用于显示、值用于对应修饰类
  priorities = [
    {
      label: '紧急',
      value: 1
    },
    {
      label: '重要',
      value: 2
    },
    {
      label: '普通',
      value: 3
    },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewTaskComponent>,
  ) { }

  ngOnInit() {
    this.title = this.data.title;
    console.log(this.data.task);
    if (this.data.task) {
      this.form = this.fb.group({
        desc: [ this.data.task.desc, Validators.required],
        priority: [this.data.task.priority, Validators.required],
        owner: [[this.data.task.owner]],
        followers: [this.data.task.participants ? this.data.task.participants : []],
        dueDate: [this.data.task.duedate ? this.data.task.duedate : ''],
        reminder: [this.data.task.reminder ? this.data.task.reminder : ''],
        remark: [this.data.task.remark ? this.data.task.remark : ''],
      });
    } else {
      this.form = this.fb.group({
        desc: ['', Validators.required],
        priority: [3, Validators.required],
        owner: [[this.data.owner]],
        followers: [[]],
        dueDate: [''],
        reminder: [''],
        remark: [''],
      });
    }
  }

  onSubmit(ev: Event, {value, valid}) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close({
      desc: value.desc,
      priority: value.priority,
      dueDate: value.dueDate,
      reminder: value.reminder,
      remark: value.remark,
      ownerId: value.owner.length > 0 ? value.owner[0].id : null,
      participantIds: value.followers.map(f => f.id)
    });
  }

}
