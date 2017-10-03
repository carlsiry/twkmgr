

import {
    trigger, // 触发器函数
    state, // 状态函数
    style, // 样式函数
    animate, // 动画函数
    transition // 变化函数
} from '@angular/animations';

// 应用于任务项的动画：悬浮放宽优先级颜色
export const taskItemAnim = trigger('taskItemAnim', [
    state('hover', style({
        'border-left-width': '8px'
    })),
    transition('void <=> hover', animate('200ms ease-in'))
]);
