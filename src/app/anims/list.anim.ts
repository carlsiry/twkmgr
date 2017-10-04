
import {
    trigger, // 触发器函数
    state, // 状态函数
    style, // 样式函数
    animate, // 动画函数
    transition, // 变化函数
    group, // 群组动画
    query,
    stagger,
} from '@angular/animations';

// 应用于卡片的动画：增加删除时浮现动画
export const listAnimation = trigger('listAnim', [
    transition('* => *', [
        query(':enter', [
            style({'opacity': '0'}),
            stagger(500, [
                animate('.5s ease-in', style({'opacity': '1'}))
            ])
        ], { optional: true }),
        query(':leave', [
            stagger(400, [
                animate('.3s ease-out', style({'opacity': '0'}))
            ])
        ], { optional: true })
    ]),
]);
