
/**
 * 2017.10.10 Carlsiry 创建自定义证件获取表单控件
 *    表单值 identity = {identityType: string, identityNo: string}
 *    表单值的订阅者 sub 用于订阅值中具体字段的变化，并发射出去
 * 2017.10.11 Carlsiry 完成自定义的省份证件号获取与发射
 *    1. 定义构成表单值的 两个 Subject:  _idType, _idNo
 *    2. 把 Subject 绑定到 字段处理事件 中，用于 发射 字段数据
 *    3. 表单初始化时，合并两个 Subject 的订阅流 => val
 *    4. 每当 字段值变化时，合并的订阅流订阅者 sub 都会将新值发射出去 构成表单控件值
 *    5. 表单控件销毁时， 取消订阅合并的订阅流
 */

 // #region importer
import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { IdentityType, Identity } from '../../domain/user.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { FormControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
// #endregion

@Component({
  selector: 'app-identity-input',
  templateUrl: './identity-input.component.html',
  styleUrls: ['./identity-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true
    }
  ]
})
export class IdentityInputComponent implements OnInit, OnDestroy, ControlValueAccessor {

  // #region Component's Property and ViewModel
  // 表单控件值
  identity: Identity = {identityType: null, identityNo: null};
  // 视图模型：用于选择证件类型
  identityTypes = [
    { value: IdentityType.IdCard, label: '身份证' },
    { value: IdentityType.Insurance, label: '医保' },
    { value: IdentityType.Military, label: '军官证' },
    { value: IdentityType.Passport, label: '护照' },
    { value: IdentityType.Other, label: '其他' },
  ];
  // 表单控件值的订阅
  private sub: Subscription;
  // 表单字段的 Subject
  private _idType = new Subject<IdentityType>();
  private _idNo = new Subject<string>();

  // 表单字段的 Subject 订阅流
  get idType(): Observable<IdentityType> {
    return this._idType.asObservable();
  }
  get idNo(): Observable<string> {
    return this._idNo.asObservable();
  }
  // #endregion

  // #region customForm implement
  // 表单值变化通知句柄
  private propagateChange = (_: any) => {};
  // 表单值初始化
  writeValue(obj: any): void {
    if (obj) {
      this.identity = obj;
    }
  }
  // 注册表单变化通知函数
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
  // 表单校验器
  validate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    if (!val) {
      return null;
    }
    switch (val) {
      case (IdentityType.IdCard): {
        return this.validateIdCard(c);
      }
      case (IdentityType.Passport): {
        return this.validatePassport(c);
      }
      case (IdentityType.Military): {
        return this.validateMilitary(c);
      }
      default: {
        return null;
      }
    }
  }
  validateIdCard(c: FormControl): {[key: string]: any} {
    const val = c.value.identityNo;
    if (val.length !== 18) {
      return { idInValid: true };
    }
    const pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/;
    return pattern.test(val) ? null : { idNotValid: true };
  }
  validatePassport(c: FormControl): {[key: string]: any} {
    const val = c.value.identityNo;
    if (val.length !== 9) {
      return { idInValid: true };
    }
    const pattern = /^[GgEe]\d{8}$/;
    return pattern.test(val) ? null : { passportNotValid: true };
  }
  validateMilitary(c: FormControl): {[key: string]: any} {
    const val = c.value.identityNo;
    const pattern = /[\u4e00-\u9fa5](字第)(\d{4,8})(号?)$/;
    return pattern.test(val) ? null : { militaryNotValid: true };
  }
  // #endregion

  // #region lifeCycleFuns
  constructor() { }
  ngOnInit() {
    const val$ = Observable.combineLatest(this.idNo, this.idType, (_no, _type) => {
      return {
        identityType: _type,
        identityNo: _no
      };
    });
    this.sub = val$.subscribe(id => {
      this.propagateChange(id);
    });
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  // #endregion

  // 每次 证件类型 选择都会发射值出去
  onIdTypeChange(idType: IdentityType) {
    this._idType.next(idType);
  }
  // 每次 证件号码 变化写入都会把证件号发射出去
  onIdNoChange(idNo: string) {
    this._idNo.next(idNo);
  }
}
