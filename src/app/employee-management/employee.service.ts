import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private http: HttpClient) {}
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  readonly baseUrl: string = 'http://localhost:5000';

  private errorHandler(error: HttpErrorResponse) {
    return throwError(() => {
      console.log(error);
      return error;
    });
  }

  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(`${this.baseUrl}/employees`, {
        headers: this.headers,
      })
      .pipe(catchError(this.errorHandler));
  }

  getEmployee(index: number): Observable<Employee> {
    return this.http
      .get<Employee>(`${this.baseUrl}/employee/${index}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.errorHandler));
  }

  addEmployee(newEmployee: Employee): Observable<string> {
    return this.http
      .post(`${this.baseUrl}/employees/add`, newEmployee, {
        headers: this.headers,
        responseType: 'text',
      })
      .pipe(catchError(this.errorHandler));
  }

  updateEmployee(index: number, updatedEmp: Employee) {
    return this.http
      .put(`${this.baseUrl}/employee/${index}/edit`, updatedEmp, {
        headers: this.headers,
        responseType: 'text',
      })
      .pipe(catchError(this.errorHandler));
  }

  deleteEmployee(index: number): Observable<string> {
    return this.http
      .delete(`${this.baseUrl}/employee/${index}/delete`, {
        headers: this.headers,
        responseType: 'text',
      })
      .pipe(catchError(this.errorHandler));
  }
}
