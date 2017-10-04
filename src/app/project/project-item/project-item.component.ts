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

  onInvate() {
    this.invate.emit();
  }
  onClickUpdateProject() {
    this.updateProject.emit();
  }
  onClickDeleteProject() {
    this.deleteProject.emit();
  }

}
