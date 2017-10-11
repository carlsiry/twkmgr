
/**
 * 2017.10.11  Carlsiry 逸夫楼
 * 增加针对身份证号控件值的观察订阅，根据值的不同获取生日、地址信息设置到生日、地址表单中
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { isValidDate } from '../../utils/date.util';
import { extractInfo, isValidAddr, getAddrByCode } from '../../utils/identity.util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  items: string[] = [];
  sub: Subscription;
  private readonly avatarName = 'avatars';
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const img = `${this.avatarName}:svg-${Math.floor(Math.random() * 16).toFixed(0)}`;
    this.form = this.fb.group({
      email: [],
      name: [],
      password: [],
      repeat: [],
      avatar: [img],
      dateOfBirth: ['1994-09-08'],
      identity: [],
      address: [],
    });
    // 定义证件流，过滤不合法的值
    const id$ = this.form.get('identity').valueChanges
      .debounceTime(300)
      .filter(_ => this.form.get('identity').valid);
    this.sub = id$.subscribe(id => {
      const info = extractInfo(id.identityNo);
      // 如果市正确的地址码
      if (isValidAddr(info.addrCode)) {
        const addr = getAddrByCode(info.addrCode);
        this.form.get('address').patchValue(addr);
      }
      if (isValidDate(info.dateOfBirth)) {
        this.form.get('dateOfBirth').patchValue(info.dateOfBirth);
      }
    });
    for (let index = 1; index < 15; index++) {
      this.items.push(`avatars:svg-${index}`);
    }
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    console.log(value);
  }
}
