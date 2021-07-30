import { IProjectsInitialState } from './project/ngrx/project.reducer';

export interface IApplicationState {
  projectState: IProjectsInitialState;
}
