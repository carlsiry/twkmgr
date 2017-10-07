
import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { subDays, subMonths, subYears, differenceInDays, differenceInMonths,
  differenceInYears, isBefore, parse, format, isDate, isFuture, isValid,
} from 'date-fns';
import { isValidDate } from '../../utils/date.util';
import {Subscription} from 'rxjs/Subscription'

export enum AgeUnit {
  Year = 0,
  Month,
  Day
}
export interface Age {
  age: number;
  unit: AgeUnit;
}

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    }
  ]
})
export class AgeInputComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthsTop = 24;
  @Input() monthsBottom = 90;
  @Input() yearsTop = 150;
  @Input() yearsBottom = 1;
  @Input() formatStr = 'YYYY-MM-DD';
  @Input() debounceTime = 300;
  dateOfBirth = '';
  selectedUnit = AgeUnit.Year;
  ageUnits = [ // 用于模版渲染
    {value: AgeUnit.Year, label: '岁'},
    {value: AgeUnit.Month, label: '月'},
    {value: AgeUnit.Day, label: '天'},
  ];
  ageForm: FormGroup;
  sub: Subscription;
  private propagateChange = (_: any) => {};

  constructor(private fb: FormBuilder, private http: Http) {}

  ngOnInit() {
    this.ageForm = this.fb.group({
      birthday: ['', this.validateDate],
      age: this.fb.group({
        ageNum: [],
        ageUnit: [AgeUnit.Year]
      }, {validator: this.validateAge('ageNum', 'ageUnit')})
    });
    // 获取字段模型
    const birthday = this.ageForm.get('birthday');
    const ageNum = this.ageForm.get('age').get('ageNum');
    const ageUnit = this.ageForm.get('age').get('ageUnit');

    // 从字段模型获取输入流
    const birthday$ = birthday.valueChanges.map(d => {
      return {date: d, from: 'birthday'};
    })
      .filter(_ => birthday.valid)
      .debounceTime(300)
      .distinctUntilChanged();

    const ageNum$ = ageNum.valueChanges
      .startWith(ageNum.value)
      .debounceTime(300)
      .distinctUntilChanged();
    const ageUnit$ = ageUnit.valueChanges
      .startWith(ageUnit.value)
      .debounceTime(300)
      .distinctUntilChanged();
    const age$ = Observable.combineLatest(ageNum$, ageUnit$, (age, unit) => {
      return this.toDateStr({age, unit});
    }).map(d => {
      return {date: d, from: 'age'}
    })
      .filter(_ => this.ageForm.get('age').valid);

    // 合并流，只针对这个流处理
    const merge$ = Observable.merge(age$, birthday$)
      .filter(_ => this.ageForm.valid);

    this.sub = merge$.subscribe(d => {
      const age = this.toAge(d.date);
      if (d.from === 'birthday') {
        if (age.age !== ageNum.value) {
          ageNum.patchValue(age.age, {emitEvent: false});
        }
        if (age.unit !== ageUnit.value) {
          ageNum.patchValue(age.age, {emitEvent: false});
        }
        this.propagateChange(d.date);
      } else { // from new (ageNum, ageUnit)
        const ageToCompare = this.toAge(birthday.value);
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit ) {
          birthday.patchValue(d.date, {emitEvent: false});
          this.propagateChange(d.date);
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  // 装换成日期字符串：传入一个 Age 类型的对象
  toDateStr(age: Age): string {
    const now = Date.now();
    const formatStr = 'YYYY-MM-DD';
    switch (age.unit) {
      case AgeUnit.Year: {
        return format(subYears(now, age.age), formatStr);
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), formatStr);
      }
      case AgeUnit.Day: {
        return format(subDays(now, age.age), formatStr);
      }
      default: {
        return null;
      }
    }
  }
  toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = Date.now();
    return isBefore(subDays(now, 90), date) ?
      {age: differenceInDays(now, date), unit: AgeUnit.Day} :
        isBefore(subMonths(now, 24), date) ?
          {age: differenceInMonths(now, date), unit: AgeUnit.Month} :
            {age: differenceInYears(now, date), unit: AgeUnit.Year};
  }

  // 表单初始化值
  writeValue(initValue: any): void {
    if (initValue) {
      const date = format(initValue, this.formatStr);
      this.ageForm.get('birthday').patchValue(date);
      const age = this.toAge(date);
      this.ageForm.get('age').get('ageNum').patchValue(age.age);
      this.ageForm.get('age').get('ageUnit').patchValue(age.unit);
    }
  }
  // 注册表单值更改的提交函数
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(): void {}

  // 表单校验
  validate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (isValidDate(val)) {
      return null;
    }
    return {
      dateStrOfBirthDayInvalid: true
    }
  }

  validateDate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    // util/date.util
    return isValidDate(val) ? null : {
      birthDayInvalid: true
    };
  }
  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;
      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal >= 1 && ageNumVal <= 150;
          break;
        }
        case AgeUnit.Month: {
          result = ageNumVal >= 1 && ageNumVal <= 24;
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal >= 1 && ageNumVal <= 90;
          break;
        }
        default: {
          break;
        }
      }
      return result ? null : {ageInvalid: true};
    };
  }
}
