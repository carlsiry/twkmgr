import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appDraggable][draggedClass]'
})
export class DragDirective {

  _isDraggable = false;
  @Input('appDraggable')
  set isDraggable(val: boolean) {
    this._isDraggable = val;
    // 设置 HTML 的 draggable 属性，告诉浏览器是否可拖拽
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${val}`);
  }
  get isDraggable() {
    return this._isDraggable;
  }

  @Input()
  draggedClass: string;

  // 注入 Dom引用、Dom渲染处理
  constructor(private el: ElementRef, private rd: Renderer2) { }

  // 监听宿主的拖拽开始事件，并把事件对象传入处理函数中
  @HostListener('dragstart', ['$event'])
  onDragStart(ev: Event) {
    // 如果触发 开始拖拽事件 的是原元素：即应用指令的组件和触发指令的组件是相同的，添加拖拽标志类
    if (this.el.nativeElement === ev.target) {
      this.rd.addClass(this.el.nativeElement, this.draggedClass);
    }
  }
  // 监听宿主的拖拽结束事件，并把事件对象传入处理函数中
  @HostListener('dragend', ['$event'])
  onDragEnd(ev: Event) {
    // 如果触发 停止拖拽事件 的是原元素：即应用指令的组件和触发指令的组件是相同的，移出拖拽标志类
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.draggedClass);
    }
  }

}
