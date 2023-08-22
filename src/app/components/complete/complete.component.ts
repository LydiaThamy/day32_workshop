import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from 'src/app/Todo';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent {

  @Input() completedTasks: Todo[]
  @Output() restoredTask = new Subject<Todo>

  tasksShown: boolean = true

  hideTasks() {
    this.tasksShown = !this.tasksShown
  }

  restoreTask(task: Todo) {
    this.deleteTask(task)
    this.restoredTask.next(task)
  }

  deleteTask(task: Todo) {
    let index: number = this.completedTasks.indexOf(task)
    this.completedTasks.splice(index, 1)
  }
}
