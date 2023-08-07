import { Component, Input } from '@angular/core';
import { Todo } from 'src/app/Todo';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() updatedTasks: Todo[]
}
