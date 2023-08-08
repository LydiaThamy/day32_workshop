import { Component, OnInit } from '@angular/core';
import { Todo } from './Todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo_list';

  taskList: Todo[] = []
  completedList: Todo[] = []

  ngOnInit(): void {
    this.fillList()
  }

  fillList() {
    this.taskList = [
      { description: 'Fold clothes', priority: 'medium', due: new Date(2023, 9, 11) },
      { description: 'Change bedsheets', priority: 'high', due: new Date(2023, 8, 13) },
      { description: 'Book holiday', priority: 'low', due: new Date(2023, 10, 30) }
    ]
  }

  // task component
  addNewTask(task: Todo) {
    this.taskList = [...this.taskList, task]
  }

  // complete component
  completeTask(task: Todo) {
      this.completedList = [...this.completedList, task]
  }

  restoreTask(task: Todo) {
    this.taskList = [...this.taskList, task]
  }
}
