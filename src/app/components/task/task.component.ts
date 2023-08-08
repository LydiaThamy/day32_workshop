import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from 'src/app/Todo';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

    @Input() updatedTasks: Todo[]
    @Output() completedTask = new Subject<Todo>()

  completeTask(task: Todo) {
    this.deleteTask(task)
    this.completedTask.next(task)
  }

  deleteTask(task: Todo) {
    let index: number = this.updatedTasks.indexOf(task)
    this.updatedTasks.splice(index, 1)
  }
}
