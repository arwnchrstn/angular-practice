import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  isLoading: boolean = false;
  employees: Employee[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private empService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.empService.getEmployees().subscribe((employees: Employee[]) => {
      this.employees = employees;
    });
  }

  onAdd() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  onView(index: number) {
    this.router.navigate(['view', index], { relativeTo: this.route });
  }

  onEdit(index: number) {
    this.router.navigate(['edit', index], { relativeTo: this.route });
  }

  onDelete(index: number) {
    if (confirm('Do you want to delete this employee')) {
      this.empService.deleteEmployee(index).subscribe(
        (data) => {
          this.employees.splice(+data, 1);
          alert('Employee deleted');
        },
        (error: HttpErrorResponse) => {
          alert(
            `Status: ${error.status}\n${error.message}\n${error.statusText}`
          );
        }
      );
    }
  }
}
