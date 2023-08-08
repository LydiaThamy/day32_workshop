import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DateValidator } from 'src/app/DateValidator';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  toDoForm: FormGroup
  @Output() newTask = new Subject<Todo>()

  // priorities: string[] = ['low', 'medium', 'high']

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.toDoForm = this.createToDo()
  }

  addTask() {
    const task = new Todo
    task.description = this.toDoForm.get('description').value.trim()
    // todo.description = this.toDoForm.controls['description'].value.trim()
    task.priority = this.toDoForm.get('priority').value
    task.due = this.toDoForm.get('due').value

    // const todo = this.toDoForm.value.trim() as Todo

    // emit todo as output
    this.newTask.next(task)

    // refresh form
    this.toDoForm = this.createToDo()
  }

  createToDo() : FormGroup {
    return this.fb.group({
      description: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
      priority: this.fb.control<string>('low'),
      due: this.fb.control<Date>(new Date(), DateValidator())
    })
  }

}
