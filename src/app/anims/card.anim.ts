
import {
    trigger, // 触发器函数
    state, // 状态函数
    style, // 样式函数
    animate, // 动画函数
    transition // 变化函数
} from '@angular/animations';

// 应用于卡片的动画：悬浮放大浮现立体效果
export const cardAnim = trigger('cardAnim', [
    state('void', style({
        'transform': 'scale(0)',
    })),
    state('hover', style({
        'transform': 'scale(1.06)',
        'box-shadow': '0 0 50px'
    })),
    transition('void => *', animate('500ms ease-in-out')),
    transition('* <=> hover', animate('400ms ease-in-out'))
]);
