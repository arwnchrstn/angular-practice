import { Component, OnInit } from '@angular/core';

import { TodoService } from './service/todo.service';
import {Todos} from '../models'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  todos: Todos[] | null | undefined
  newTodo!: string;
  showForm!: boolean;

  constructor(private todoService: TodoService) {
    
  }

  ngOnInit(): void {
    this.showForm = false;
    this.newTodo = '';
    
    this.todoService.getTodos().subscribe((data: Todos[]) => {
      this.todos = data
    })
  }

  toggleForm(): void {
    if (this.showForm) {
      this.newTodo = '';
      this.showForm = !this.showForm;
      return;
    }

    this.showForm = !this.showForm;
  }

  addTodo(): void {
    if (!this.newTodo) return;

    this.todos?.push({"name": this.newTodo});
    this.toggleForm();
  }

  deleteTodo(event: string | number): void {
    this.todos = this.todos?.filter((todo) => todo.name !== event);
  }
}
