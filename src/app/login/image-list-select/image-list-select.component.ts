import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => ImageListSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef( () => ImageListSelectComponent),
      multi: true
    }
  ]
})
export class ImageListSelectComponent implements ControlValueAccessor {

  @Input() title = '请选择';
  @Input() cols = 6;
  @Input() rowHeight = '64px';
  @Input() items: string[] = [];
  @Input() useSvgIcon = false;
  @Input() itemWidth = '80px';
  selected: string; // 自定义表单值
  private propagateChange = (_: any) => {};

  constructor() { }

  // 用于表单填值
  writeValue(obj: any): void {
    this.selected = obj;
  }
  // 用于通知表单值变化：fn 为句柄
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  // 表单变脏（聚焦过）
  registerOnTouched(fn: any): void { }

  onChange(i) {
    this.selected = this.items[i];
    this.propagateChange(this.selected);
  }
  validate(c: FormControl): {[key: string]: any} {
    return this.selected ? null : {
      imageListInvalid: {
        valid: false
      }
    }
  }

}
