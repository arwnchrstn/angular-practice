import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todoItem!: string | number;

  @Output() deleteEventEmitter = new EventEmitter<string | number>();

  handleDelete(event: any) {
    this.deleteEventEmitter.emit(
      event?.target.previousElementSibling.innerText
    );
  }
}
