
/**
 *  2017.10.14 Carlsiry 增加选择卡片的跳转到任务列表的的操作
 *  2017.10.15 Carlsiry 增加 编辑 邀请 删除按钮的冒泡处理 ： ev.stopPropagation();
 */
import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { cardAnim } from '../../anims/card.anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [
    cardAnim
  ]
})
export class ProjectItemComponent implements OnInit {

  @Input() item;
  @Output() invate = new EventEmitter<void>();
  @Output() updateProject = new EventEmitter<void>();
  @Output() deleteProject = new EventEmitter<void>();
  @Output() selectedProject = new EventEmitter<void>();
  @HostBinding('@cardAnim') cardState;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.cardState = 'hover';
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.cardState = '';
  }

  // 防止冒泡以免触发项目卡片的选择操作
  onInvate(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    this.invate.emit();
  }
  onClickUpdateProject(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    this.updateProject.emit();
  }
  onClickDeleteProject(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    this.deleteProject.emit();
  }
  onSelectedProject() {
    this.selectedProject.emit();
  }
}
