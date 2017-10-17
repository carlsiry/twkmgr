
/**
 * 2017.10.16 增加了新增任务的表单
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
    this.form = this.fb.group({
      desc: [this.data.task ? this.data.task.desc : '', Validators.required],
      priority: [this.data.task ? this.data.task.priority : 3, Validators.required],
      owner: [this.data.task ? [this.data.task.owner] : [this.data.owner]],
      followers: [this.data.task ? [this.data.task.participants] : []],
      dueDate: [this.data.task ? this.data.task.duedate : ''],
      reminder: [this.data.task ? this.data.task.reminder : ''],
      remark: [this.data.task ? this.data.task.remark : ''],
    })
  }

  onSubmit(ev: Event, {value, valid}) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close({
      ...value,
      ownerId: value.owner.length > 0 ? value.owner[0].id : null,
      particippants: value.followers.map(f => f.id)
    })
  }

}
