/**
 * 2017.10.10 创建组件 --- Carlsiry
 * 2017.10.11 完成组件 --- Carlsiry
 *  _address 表单控件值
 *  _province, _city ... 表单字段发布订阅者
 * onChange 发布字段新值
 *  province$ 字段订阅流
 *  sub 表单控制值订阅者，发射表单控件新值
 *  provinces$ 下拉选择，cities$ 跟随 province$ 字段流中值的不同而更新，类推县区
 */
import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Address } from '../../domain/user.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { getAreaByCity, getCitiesByProvince, getProvinces } from '../../utils/area.util';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true
    }
  ]
})
export class AreaListComponent implements OnInit, OnDestroy, ControlValueAccessor {

  // #region Property and ViewModel
  // 表单控件值 用于视图交互中
  _address: Address = {
    province: '',
    city: '',
    district: '',
    street: ''
  };
  // 表单字段值 发布订阅者
  _province = new Subject();
  _city = new Subject();
  _district = new Subject();
  _street  = new Subject();

  // 下拉选择项的数据流 s 用于 视图中
  provinces$: Observable<string[]>;
  cities$: Observable<string[]>;
  districts$: Observable<string[]>;
  // 表单控件值的订阅者
  private sub: Subscription;
  // #endregion

  // #region CustomForm Implement
  private propagateChange = (_: any) => {};
  writeValue(obj: Address): void {
    if (obj) {
      this._address = obj;
      if (obj.province) {
        this._province.next(obj.province);
      }
      if (obj.city) {
        this._city.next(obj.city);
      }
      if (obj.district) {
        this._district.next(obj.district);
      }
      if (obj.street) {
        this._street.next(obj.street);
      }
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
  validate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (val.province && val.city && val.district && val.street) {
      return null;
    }
    return { addressInValid: true};
  }
  // #endregion

  // #region Component Lifecircle
  constructor() { }
  ngOnInit() {
    // 表单字段的订阅流
    const province$ = this._province.asObservable().startWith('');
    const city$ = this._city.asObservable().startWith('');
    const district$ = this._district.asObservable().startWith('');
    const street$ = this._street.asObservable().startWith('');
    this.provinces$ = Observable.of(getProvinces());
    this.cities$ = province$.map((p: string) => {
      console.log('cities$' + p);
      return getCitiesByProvince(p)
    });
    this.districts$ = Observable.combineLatest(province$, city$, (_p: string, _c: string) => getAreaByCity(_p, _c));
    // 表单控件值的订阅流
    const val$ = Observable.combineLatest([province$, city$, district$, street$], (_p, _c, _d, _s) => {
      return { // this._address
        province: _p,
        city: _c,
        distric: _d,
        street: _s
      };
    });
    // 表单控件值的订阅
    this.sub = val$.subscribe(val => {
      this.propagateChange(val);
    });
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  // #endregion

  onProvinceChange() {
    this._province.next(this._address.province);
  }
  onCityChange() {
    this._city.next(this._address.city);
  }
  onDistrictChange() {
    this._district.next(this._address.district);
  }
  onStreetChange() {
    this._street.next(this._address.street);
  }

}
