import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { empRoutes } from './employee.routes';
import { ListComponent } from './list/list.component';
import { EmployeeManagementComponent } from './employee-management.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [EmployeeManagementComponent, ListComponent, ViewComponent, EditComponent],
  imports: [SharedModule, RouterModule.forChild(empRoutes)],
})
export class EmployeeModule {}
