import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects = [
    {
      name: '一个项目噢',
      desc: '这个一个团队项目',
      coverImg: 'assets/img/covers/0.jpg'
    },
    {
      name: '又一个项目噢',
      desc: '这个一个团队项目',
      coverImg: 'assets/img/covers/1.jpg'
    },
    {
      name: '又一个项目噢',
      desc: '这个一个团队项目',
      coverImg: 'assets/img/covers/1.jpg'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
