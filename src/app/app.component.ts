import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  todos: string[];
  newTodo: string;
  showForm: boolean;

  constructor() {
    this.todos = [];
    this.showForm = false;
    this.newTodo = '';
  }

  toggleForm() {
    if (this.showForm) {
      this.newTodo = '';
      this.showForm = !this.showForm;
      return;
    }

    this.showForm = !this.showForm;
  }

  addTodo() {
    if (!this.newTodo) return;

    this.todos.push(this.newTodo);
    this.toggleForm();
  }

  deleteTodo(event: any) {
    this.todos = this.todos.filter((todo) => todo !== event);
  }
}
