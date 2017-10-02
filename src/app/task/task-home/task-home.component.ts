import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {

  lists = [
    {
      id: 1,
      name: '待办事项',
      tasks: [
        {
          id: 1,
          desc: '任务一：去辛巴克买咖啡',
          completed: true,
          priority: 1,
          owner: {
            id: 1,
            name: '章三',
            avatar: 'avatars:svg-11',
            dueDate: new Date()
          },
          reminder: new Date()
        },
        {
          id: 2,
          desc: '完成老板的任务先去干么接口连接将发送旅客的去辛巴克买咖啡',
          completed: false,
          priority: 2,
          owner: {
            id: 1,
            name: '章三',
            avatar: 'avatars:svg-1',
            dueDate: new Date()
          }
        },
        {
          id: 3,
          desc: '任务一：去辛巴克买咖啡',
          completed: false,
          priority: 3,
          owner: {
            id: 1,
            name: '章三',
            avatar: 'avatars:svg-2',
            // dueDate: new Date()
          },
          reminder: new Date()
        }
      ]
    },
    {
      id: 2,
      name: '完成事项',
      tasks: [
        {
          id: 1,
          desc: '任务一：去辛巴克买咖啡',
          completed: true,
          priority: 1,
        },
        {
          id: 1,
          desc: '任务一：去辛巴克买咖啡',
          completed: false,
          priority: 3,
          owner: {
            id: 1,
            name: '章三',
            avatar: 'avatars:svg-5',
            dueDate: new Date()
          },
          reminder: new Date()
        }
      ]
    },
  ];

  constructor(private mdDialog: MdDialog) { }

  ngOnInit() {
  }
  // 打开新建任务对话框
  openAddNewTaskDialog() {
    this.mdDialog.open(NewTaskComponent);
  }

}