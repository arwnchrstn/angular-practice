import { Injectable } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private server_url = 'http://localhost:5000';
  private todos: Todo[] = [];
  todosSubject: Subject<Todo[]> = new Subject<Todo[]>();
  isFetching: boolean = false;

  private updateTodoSubject() {
    this.todosSubject.next(this.todos);
  }

  constructor(private http: HttpClient, private router: Router) {}

  getTodos() {
    this.isFetching = true;
    this.http
      .get<Todo[]>(`${this.server_url}/todos`)
      .subscribe((todos: Todo[]) => {
        this.todos = todos;
        this.isFetching = false;
        this.updateTodoSubject();
      });
  }

  getTodo(index: number): Todo {
    return this.todos[index];
  }

  addTodo(todo: Todo) {
    this.http
      .post<Todo>(`${this.server_url}/todos/add`, todo)
      .subscribe((todo) => {
        this.todos.push(todo);
        this.router.navigate(['/todos', this.todos.length - 1]);
        this.updateTodoSubject();
      });
  }

  updateTodo(index: number, todo: Todo) {
    this.http
      .put<number>(`${this.server_url}/todos/${index}`, todo)
      .subscribe((index) => {
        this.todos.splice(index, 1, todo);
        this.router.navigate(['/todos', index]);
        this.updateTodoSubject();
      });
  }

  deleteTodo(index: number) {
    this.http
      .delete<number>(`${this.server_url}/todos/${index}`)
      .subscribe((index) => {
        this.todos.splice(index, 1);
        this.router.navigate(['/todos']);
        this.updateTodoSubject();
      });
  }
}
