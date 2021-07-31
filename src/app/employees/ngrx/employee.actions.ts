import { createAction, props } from '@ngrx/store';
import { IEmployee } from '../employee.interface';

/** **************************************
 *  Load Employees
 ***************************************/

const loadEmployeesBegin = createAction('[Employee] Load Employees Begin');
const loadEmployeesSuccess = createAction(
  '[Employee] Load Employees Success',
  props<{ employees: IEmployee[] }>()
);
const loadEmployeesFailure = createAction(
  '[Employee] Load Employees Failure',
  props<{ error: any }>()
);

export const loadEmployees = {
  begin: loadEmployeesBegin,
  success: loadEmployeesSuccess,
  failure: loadEmployeesFailure,
};
