/**
 * 规格说明书：
 *    通过提供一个输入查询框和已选显示条 => 来完成：一个用户成员或者多个成员的添加和删除
 *    控件返回值：User[]
 * 2017.10.09 创建自动建议表单控件
 * 2017.10.10 基本完成自动建议表单控件 -- Carlsiry
 * 2017.10.10 修复 表单校验无效问题，和传入值未校验问题
 * 2017.10.26 添加本组件的规格说明书
 */

// #region importer
import {Component, forwardRef, Input, OnInit} from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User } from '../../domain/user.model';
import { UserService } from 'app/services/user.service';
// #endregion

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true
    }
  ]
})
export class ChipsListComponent implements OnInit, ControlValueAccessor {

  /**
   * view model
   * 是否多选、输入框提示文字、操作提示文字、表单模型、用户们（控件值）、成员流
   * multiple, placeholderText,label,form,items,memberResults$
   */
  // #region view model
  @Input() multiple = true;
  @Input() placeholderText = '请输入成员 email:';
  @Input() label = '添加/修改成员';
  form: FormGroup;
  items: User[] = [];
  memberResults$: Observable<User[]>;
  private propagateChange = (_: any) => {};
  // #endregion

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.form = this.fb.group({
      memberSearch: ['']
    });
    this.memberResults$ = this.form.get('memberSearch').valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .filter(s => s && s.length > 1)
      .switchMap(str => this.userService.searchUsers(str));
  }

  // 设置表单初始值
  writeValue(users: User[]): void {
    if (users && this.multiple) {
      const userEntities = users.reduce((e, c) => ({...e, c}), {});
      if (this.items) {
        const remaining = this.items.filter(item => !userEntities[item.id]);
        this.items = [...remaining, ...users];
      }
    } else if (users) {
      this.items = [...users];
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void { }

  // 如果用户们为空则返回错误
  validate(c: FormControl): {[key: string]: any} {
    return this.items.length > 0 ? null : {
      chipsListInvalid: true
    };
  }

  // 删除选择的成员
  removeMember(member: User) {
    const ids = this.items.map(item => item.id);
    const i = ids.indexOf(member.id);
    if (this.multiple) {
      this.items = [...this.items.slice(0, i), ...this.items.slice( i + 1)];
    } else {
      this.items = [];
    }
    this.form.patchValue({memberSearch: ''});
    this.propagateChange(this.items);
  }
  // 添加成员
  handleMemberSelection(member: User) {
    if (this.items.map(item => item.id).indexOf(member.id) !== -1) {
      return;
    }
    this.items = this.multiple ? [...this.items, member] : [member];
    this.form.patchValue({memberSearch: member.name});
    this.propagateChange(this.items);
  }
  // 选择自动完成后输入框里显示什么值
  displayUser(user: User): string {
    return user ? user.name : '';
  }
  get displayInput() {
    // 如果为多选或者单选为选则显示
    return this.multiple || this.items.length === 0;
  }
}
