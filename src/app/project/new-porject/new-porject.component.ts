
/**
 * 2017.10.09 完善了增加项目和修改项目的具体功能实现
 *  1. 增加项目表单
 *  2. 加入表单提交功能实现
 */
import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-porject',
  templateUrl: './new-porject.component.html',
  styleUrls: ['./new-porject.component.scss']
})
export class NewPorjectComponent implements OnInit {

  title: string;
  coverImages: string[];
  form: FormGroup;
  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dialogRef: MdDialogRef<NewPorjectComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.coverImages = this.data.thumbnails;
    // 如果传入了项目，则为修改项目
    if (this.data.project) {
      this.form = this.fb.group({
        name: [this.data.project.name, Validators.required],
        desc: [this.data.project.desc],
        coverImg: [this.buildPrevImg(this.data.project.coverImg)],
      });
      this.title = '修改项目：';
    } else {
    // 否则为新建项目
      this.form = this.fb.group({
        name: ['', Validators.required],
        desc: [],
        coverImg: [this.data.img],
      });
      this.title = '创建项目';
    }
  }
  // 表单提交
  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    console.log(value);
    this.dialogRef.close(value);
  }
  // 把修改项目的图片地址改为缩略图的链接地址
  buildPrevImg(img: string): string {
    return img.split('.')[0] + '_tn.jpg';
  }
}
