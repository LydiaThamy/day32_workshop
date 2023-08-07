import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DateValidator } from 'src/app/DateValidator';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  toDoForm: FormGroup
  @Output() newTask = new Subject<Todo>()

  // priorities: string[] = ['low', 'medium', 'high']

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.toDoForm = this.createToDo()
  }

  addTodo() {
    // emit todo as output

    const todo = new Todo
    // const todo = this.toDoForm.value.trim() as Todo

    todo.description = this.toDoForm.get('description').value.trim()
    // todo.description = this.toDoForm.controls['description'].value.trim()

    todo.priority = this.toDoForm.get('priority').value
    todo.due = this.toDoForm.get('due').value

    this.newTask.next(todo)

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
