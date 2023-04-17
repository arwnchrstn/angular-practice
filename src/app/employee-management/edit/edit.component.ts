import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CanComponentDeactivate } from 'src/app/deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, CanComponentDeactivate {
  form: FormGroup = new FormGroup({});
  departmentOptions: string[] = [
    'IT',
    'HR',
    'AWS-Administrative',
    'Tax/Assurance',
    'People Advisory',
  ];
  defaultDept: string = this.departmentOptions[0];
  editIndex!: number;
  editedEmployee!: Employee;
  editMode: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private empService: EmployeeService
  ) {}

  private initForm(): void {
    let name = '';
    let email = '';
    let contactNo = '';
    let department = this.defaultDept;
    let emergencyContacts = new FormArray([
      new FormGroup({
        name: new FormControl('', [Validators.required]),
        contactNo: new FormControl('', [Validators.required]),
      }),
    ]);

    if (this.editMode) {
      name = this.editedEmployee.name;
      email = this.editedEmployee.email;
      contactNo = this.editedEmployee.contactNo;
      department = this.editedEmployee.department;

      emergencyContacts.clear();
      for (const contact of this.editedEmployee.emergencyContacts) {
        emergencyContacts.push(
          new FormGroup({
            name: new FormControl(contact.name, [Validators.required]),
            contactNo: new FormControl(contact.contactNo, [
              Validators.required,
            ]),
          })
        );
      }
    }

    this.form = new FormGroup({
      name: new FormControl(name, [Validators.required]),
      email: new FormControl(email, [Validators.required, Validators.email]),
      contactNo: new FormControl(contactNo, [Validators.required]),
      department: new FormControl(department, [Validators.required]),
      emergencyContacts: emergencyContacts,
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.editIndex = params['index'];
      if (!this.editIndex) return;

      this.empService
        .getEmployee(+this.editIndex)
        .subscribe((emp: Employee) => {
          if (!emp) {
            this.router.navigate(['/employee-management']);
            return;
          }

          this.editMode = true;
          this.editedEmployee = emp;
          this.initForm();
          return;
        });
    });

    this.initForm();
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.form.dirty) {
      return confirm(
        'Are you sure you want to leave? Changes may not be saved'
      );
    } else {
      return true;
    }
  }

  get emergencyContactsArray() {
    return this.form.get('emergencyContacts') as FormArray;
  }

  onAddEmergencyContact() {
    this.emergencyContactsArray.push(
      new FormGroup({
        name: new FormControl('', [Validators.required]),
        contactNo: new FormControl('', [Validators.required]),
      })
    );
  }

  onDeleteEmergencyContact(index: number) {
    this.emergencyContactsArray.removeAt(index);
  }

  onCancel() {
    this.router.navigate(['/employee-management']);
  }

  onSubmit() {
    if (!this.form.valid) return;

    if (this.editMode) {
      this.empService.updateEmployee(this.editIndex, this.form.value).subscribe(
        (data) => {
          alert(data);
          this.router.navigate(['/employee-management']);
        },
        (error: HttpErrorResponse) => {
          alert(
            `Status: ${error.status}\n${error.message}\n${error.statusText}`
          );
        }
      );
      return;
    }

    this.empService.addEmployee(this.form.value).subscribe(
      (data) => {
        alert(data);
        this.router.navigate(['/employee-management']);
      },
      (error: HttpErrorResponse) => {
        alert(`Status: ${error.status}\n${error.message}\n${error.statusText}`);
      }
    );
  }
}
