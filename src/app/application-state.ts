import { IProjectsInitialState } from './project/ngrx/project.reducer';
import { IEmployeeInitialState } from './employees/ngrx/employee.reducer';

export interface IApplicationState {
  projectState: IProjectsInitialState;
  employeeState: IEmployeeInitialState;
}
