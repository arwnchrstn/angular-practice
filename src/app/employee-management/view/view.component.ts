import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  isLoading: boolean = false;
  selectedEmp!: Employee;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params: Params) => {
      this.empService
        .getEmployee(+params['index'])
        .subscribe((employee: Employee) => {
          this.isLoading = false;
          if (!employee) {
            this.router.navigate(['/employee-management']);
            return;
          }

          this.selectedEmp = employee;
        });
    });
  }
}
