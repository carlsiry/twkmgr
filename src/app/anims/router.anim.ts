
import {
    trigger, // 触发器函数
    state, // 状态函数
    style, // 样式函数
    animate, // 动画函数
    transition, // 变化函数
    group, // 群组动画
} from '@angular/animations';

// 应用于卡片的动画：悬浮放大浮现立体效果
export const slideToRight = trigger('routeAnim', [
    // state('*', style({
    // })),
    transition(':enter', [
        style({
            'position': 'fixed',
            'width': '100%',
            'height': '84%',
            'transform': 'translateX(-100%)',
            'opacity': '0'
        }),
        group([
            animate('1s ease-in-out', style({'transform': 'translateX(0)'})),
            animate('.5s ease-in', style({'opacity': '1'}))
        ])
    ]),
    transition(':leave', [
        style({
            'position': 'fixed',
            'width': '100%',
            'height': '84%',
            'transform': 'translateX(0)',
            'opacity': '1'
        }),
        group([
            animate('1s ease-in-out', style({'transform': 'translateX(100%)'})),
            animate('.5s ease-in', style({'opacity': '0'}))
        ])
    ]),
]);
