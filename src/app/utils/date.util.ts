
import {
  isDate, parse, isValid, isFuture, differenceInYears
} from 'date-fns';

// 校验出生日期是否合法有效：是时间类型、有效、不是将来时间、小于150岁
export const isValidDate = (dateStr: string): boolean => {
  const date = parse(dateStr);
  return isDate(date)
      && isValid(date)
      && !isFuture(date)
      && differenceInYears(Date.now(), date) < 150;
}
