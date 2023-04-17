import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  {
    path: 'todos',
    loadChildren: () =>
      import('./todo/todo.module').then((mod) => mod.TodoModule),
  },
  {
    path: 'employee-management',
    loadChildren: () =>
      import('./employee-management/employee.module').then(
        (mod) => mod.EmployeeModule
      ),
  },
  { path: '**', redirectTo: '/todos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
