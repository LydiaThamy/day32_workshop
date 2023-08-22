import { Component, OnInit } from '@angular/core';
import { Todo } from './Todo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateValidator } from './services/DateValidator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'todo_list';

  toDoForm: FormGroup

  editedTask: Todo

  taskList: Todo[]
  completedList: Todo[]

  addNotEdit: boolean = true

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createToDo()

    // configure local storage
    this.setupLocalStorage()
  }

  fillList() {
    this.taskList = [
      { index: 0, description: 'Fold clothes', priority: 'medium', due: new Date(2023, 9, 11) },
      { index: 1, description: 'Change bedsheets', priority: 'high', due: new Date(2023, 8, 13) },
      { index: 2, description: 'Book holiday', priority: 'low', due: new Date(2023, 10, 30) }
    ]
  }

  setupLocalStorage() {

    const outstandingTask = localStorage.getItem('outstanding tasks')
    if (outstandingTask != null && outstandingTask != "undefined" && JSON.parse(outstandingTask).length > 0) {
      this.taskList = JSON.parse(outstandingTask)
    } else {
      this.taskList = []
      this.fillList()
      localStorage.setItem('outstanding tasks', JSON.stringify(this.taskList))
    }

    const completedTask = localStorage.getItem('completed tasks')
    if (completedTask != null && completedTask !== "undefined" && JSON.parse(completedTask).length > 0) {
      this.completedList = JSON.parse(completedTask)
      console.log("1")
    } else {
      this.completedList = []
      // localStorage.setItem('completed tasks', JSON.stringify(this.completedList))
    }
  }

  createToDo() {
    this.toDoForm = this.fb.group({
      description: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
      priority: this.fb.control<string>('low'),
      due: this.fb.control<string>('', [Validators.required, DateValidator()])
    })
  }

  // add or edit
  editTodo(task: Todo) {

    if (typeof task.due == "string")
      task.due = new Date(task.due)

    this.addNotEdit = false

    task.index = this.taskList.findIndex(x => x.description === task.description)
    this.editedTask = task

    this.toDoForm = this.fb.group({
      description: this.fb.control<string>(task.description, [Validators.required, Validators.minLength(5)]),
      priority: this.fb.control<string>(task.priority),
      due: this.fb.control<string>(task.due.toISOString().substring(0, 10), [Validators.required, DateValidator()])
    })

  }

  submitTask() {

    let task = new Todo
    let index: number

    task.description = this.toDoForm.get('description').value.trim()
    // todo.description = this.toDoForm.controls['description'].value.trim()
    task.priority = this.toDoForm.get('priority').value
    task.due = new Date(this.toDoForm.get('due').value)

    // add task
    if (this.addNotEdit) {

      // emit todo as output
      this.taskList = [...this.taskList, task]

      localStorage.setItem('outstanding tasks', JSON.stringify(this.taskList))

      // edit task
    } else {
      index = this.editedTask.index

      this.taskList.splice(index, 1, task)
      localStorage.setItem('outstanding tasks', JSON.stringify(this.taskList))

      this.addNotEdit = true
    }

    // refresh form
    this.createToDo()
  }

  // complete
  completeTask(task: Todo) {
    // if (this.completedList === undefined) {
    //   this.completedList = []
    // }
    this.completedList = [...this.completedList, task]
    localStorage.setItem('completed tasks', JSON.stringify(this.completedList))
    localStorage.setItem('outstanding tasks', JSON.stringify(this.taskList))
  }

  // restore
  restoreTask(task: Todo) {
    this.taskList = [...this.taskList, task]
    localStorage.setItem('outstanding tasks', JSON.stringify(this.taskList))
  }

  deleteTask(task: Todo) {
    localStorage.setItem('outstanding tasks', JSON.stringify(this.taskList))
  }
}
