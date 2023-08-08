import { Component, Input, Output, DoCheck, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from 'src/app/Todo';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent{

  @Input() updatedTasks: Todo[]
  @Output() completedTask = new Subject<Todo>()
  @Output() editedTask = new Subject<Todo>()

  ngDoCheck(): void {
    
    if (this.updatedTasks == null)
      this.updatedTasks = []

    localStorage.setItem('outstanding tasks', JSON.stringify(this.updatedTasks))
  }

  completeTask(task: Todo) {
    let index: number = this.updatedTasks.indexOf(task)
    this.updatedTasks.splice(index, 1)
    this.completedTask.next(task)
  }

  editTask(task: Todo) {
    this.editedTask.next(task)
  }

  deleteTask(task: Todo) {
    let index: number = this.updatedTasks.indexOf(task)
    this.updatedTasks.splice(index, 1)
  }

}
