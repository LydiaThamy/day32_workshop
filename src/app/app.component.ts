import { Component } from '@angular/core';
import { Todo } from './Todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo_list';

  taskList: Todo[]

  addNewTask(todo: Todo) {

    if (this.taskList == null) {
      this.taskList = [todo]
    } else {
      this.taskList = [...this.taskList, todo]
    }
  }
}
