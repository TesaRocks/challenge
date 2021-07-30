import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IProject } from '../project.interface';
import {
  loadProjects,
  loadProject,
  updateProject,
  deleteProject,
} from './project.actions';

export const projectsFeatureKey = 'projectsState';

export interface IProjectsInitialState extends EntityState<IProject> {
  // additional entities state properties
  error: any;
  selectedProject: IProject | null;
}
export const adapter: EntityAdapter<IProject> = createEntityAdapter<IProject>();

export const projectsInitialState: IProjectsInitialState =
  adapter.getInitialState({
    // additional entity state properties
    error: null,
    selectedProject: null,
  });

export const reducer = createReducer(
  projectsInitialState,
  // Load Projects
  on(loadProjects.begin, (state) => {
    return { ...state };
  }),
  on(loadProjects.success, (state, action) => {
    return { ...adapter.setAll(action.projects, state) };
  }),
  on(loadProjects.failure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  // Load Project
  on(loadProject.begin, (state) => {
    return { ...state };
  }),
  on(loadProject.success, (state, action) => {
    return {
      ...state,
      selectedProject: action.selectedProject,
    };
  }),

  on(loadProject.failure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  // Update Project
  on(updateProject.success, (state, action) =>
    adapter.updateOne(action.project, state)
  ),
  // Delete Project
  on(deleteProject.begin, (state) => {
    return { ...state };
  }),
  on(deleteProject.success, (state, action) => {
    return { ...adapter.removeOne(action.id, state) };
  }),
  on(deleteProject.failure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);
export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
