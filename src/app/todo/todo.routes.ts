import { Routes } from '@angular/router';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { DefaultComponent } from './default/default.component';
import { DetailsComponent } from './details/details.component';
import { TodoComponent } from './todo.component';

export const todoRoutes: Routes = [
  {
    path: 'todos',
    component: TodoComponent,
    children: [
      { path: '', component: DefaultComponent },
      { path: 'add', component: AddTodoComponent },
      { path: ':index', component: DetailsComponent },
      { path: ':index/edit', component: AddTodoComponent },
    ],
  },
];
