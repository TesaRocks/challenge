import { IProjectsInitialState } from './project/ngrx/project.reducer';
import { IEmployeeInitialState } from './employees/ngrx/employee.reducer';
import { IHeaderInitialState } from './header/ngrx/header.reducer';

export interface IApplicationState {
  projectState: IProjectsInitialState;
  employeeState: IEmployeeInitialState;
  headerState: IHeaderInitialState;
}
