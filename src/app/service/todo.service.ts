import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Todos } from 'src/models';

const API: string = 'http://localhost:3000/todos'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {}

  getTodos() : Observable<Todos[]>{
    return this.http.get<Todos[]>(API)
  }
}
