import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from './todo.service';
import { Subscription } from 'rxjs';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit, OnDestroy {
  todoSubscription!: Subscription;
  todos: Todo[] = [];
  isFetching: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.todoService.getTodos();
    this.todoSubscription = this.todoService.todosSubject.subscribe(
      (todos: Todo[]) => {
        this.todos = todos;

        this.isFetching = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.todoSubscription.unsubscribe();
  }

  onClickAdd() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}
