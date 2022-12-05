import { Component, Input, Output, EventEmitter } from '@angular/core';

import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todoItem!: string;

  @Output() deleteEventEmitter = new EventEmitter<string>();

  handleDelete(event: any) {
    this.deleteEventEmitter.emit(
      event?.target.previousElementSibling.innerText
    );
  }
}
