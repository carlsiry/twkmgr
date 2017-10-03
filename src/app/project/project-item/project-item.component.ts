import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() item;
  @Output() invate = new EventEmitter<void>();
  @Output() updateProject = new EventEmitter<void>();
  @Output() deleteProject = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
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
