import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EmployeeService } from '../employee.service';
import { loadEmployees } from './employee.actions';
import { IEmployee } from '../employee.interface';
@Injectable()
export class EmployeeEffects {
  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmployees.begin),
      mergeMap(() =>
        this.employeeService.fetchEmployees().pipe(
          map((employees) => {
            let employeeEntries: any = Object.entries(employees);
            let mapedEmployees: IEmployee[] = [];
            for (let employee of employeeEntries) {
              let employeeId = employee[0];
              employee.splice(0, 1);
              employee[0].id = employeeId;
              mapedEmployees.push(employee[0]);
            }
            return loadEmployees.success({ employees: mapedEmployees });
          }),
          catchError((error) => of(loadEmployees.failure({ error })))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService
  ) {}
}
