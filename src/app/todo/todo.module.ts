import { NgModule } from '@angular/core';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { DefaultComponent } from './default/default.component';
import { DetailsComponent } from './details/details.component';
import { TodoComponent } from './todo.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { todoRoutes } from './todo.routes';

@NgModule({
  declarations: [
    TodoComponent,
    AddTodoComponent,
    DefaultComponent,
    DetailsComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(todoRoutes)],
})
export class TodoModule {}
