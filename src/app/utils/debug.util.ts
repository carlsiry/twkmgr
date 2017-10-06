
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

// 在 模块下声明调试接口的类型
declare module 'rxjs/Observable' {
    interface Observable<T> {
        debug: (...any) => Observable<T>;
    }
}

// #region method docs
// 给所有的数据流添加调试记录方法：传入记录标志，为流中每个值输出标记日志，错误日志，完成日志
// example:
    // let interval$ = Rx.Observable.interval(100).take(3);
    // interval$.debug('Test interval$ : ');
    // interval$.subscribe(next => console.log(next));
    // Test interval$ :
    // 0
    // 0
    // Test interval$ :
    // 1
    // 1
    // Test interval$ :
    // 2
    // 2
    // Test interval$ :
    // Completed -
// #endregion
Observable.prototype.debug = function(message: string) {

    return this.do(
        (next) => {
            if (!environment.production) {
                console.log(message, next);
            }
        },
        (error) => {
            if (!environment.production) {
                console.log('error>>>', message, error);
            }
        },
        () => {
            if (!environment.production) {
                console.log(message, ' Completed - ');
            }
        }
    );
};
