
/**
 * 2017.10.14 增加任务列表的表单
 */
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss']
})
export class NewTaskListComponent implements OnInit {

  title = '';
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private fb: FormBuilder,
    private dailog: MatDialogRef<NewTaskListComponent>,
  ) {
    this.form = fb.group({
      name: [this.data.listName ? this.data.listName : '']
    });
  }

  ngOnInit() {
    this.title = this.data.title;
  }

  onSubmit({value, valid}, ev: Event) {
    if (!valid) {
      return;
    }
    this.dailog.close(value);
  }
}
