import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee } from './employee.interface';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private http: HttpClient) {}

  fetchEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(
      'https://estoeschallenge-default-rtdb.firebaseio.com/employee.json'
    );
  }
}
