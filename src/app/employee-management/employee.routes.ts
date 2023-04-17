import { Routes } from '@angular/router';
import { EmployeeManagementComponent } from './employee-management.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { DeactivateGuard } from '../deactivate-guard.service';

export const empRoutes: Routes = [
  {
    path: '',
    component: EmployeeManagementComponent,
    children: [
      { path: '', component: ListComponent },
      {
        path: 'add',
        component: EditComponent,
        canDeactivate: [DeactivateGuard],
      },
      { path: 'view/:index', component: ViewComponent },
      {
        path: 'edit/:index',
        component: EditComponent,
        canDeactivate: [DeactivateGuard],
      },
    ],
  },
];
