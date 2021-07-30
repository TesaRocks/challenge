import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IProject } from '../project.interface';
import {
  loadProjects,
  loadProject,
  updateProject,
  deleteProject,
} from './project.actions';

export const projectsFeatureKey = 'projectState';

export interface IProjectsInitialState extends EntityState<IProject> {
  // additional entities state properties
  error: any;
  selectedProject: IProject | null;
  loadProjectsPending: boolean;
  loadProjectPending: boolean;
  addProjectPending: boolean;
  updateProjectPending: boolean;
  deleteProjectPending: boolean;
}
export const adapter: EntityAdapter<IProject> = createEntityAdapter<IProject>();

export const projectsInitialState: IProjectsInitialState =
  adapter.getInitialState({
    // additional entity state properties
    error: null,
    selectedProject: null,
    loadProjectsPending: false,
    loadProjectPending: false,
    addProjectPending: false,
    updateProjectPending: false,
    deleteProjectPending: false,
  });

export const reducer = createReducer(
  projectsInitialState,
  // Load Projects
  on(loadProjects.begin, (state) => {
    return { ...state, loadProjectPending: true };
  }),
  on(loadProjects.success, (state, action) => {
    return {
      ...adapter.setAll(action.projects, state),
      loadProjectPending: false,
    };
  }),
  on(loadProjects.failure, (state, action) => {
    return {
      ...state,
      loadProjectPending: false,
      error: action.error,
    };
  }),
  // Load Project
  on(loadProject.begin, (state) => {
    return { ...state, loadProjectPending: true };
  }),
  on(loadProject.success, (state, action) => {
    return {
      ...state,
      loadProjectPending: false,
      selectedProject: action.selectedProject,
    };
  }),

  on(loadProject.failure, (state, action) => {
    return {
      ...state,
      loadProjectPending: false,
      error: action.error,
    };
  }),
  // Update Project
  on(updateProject.success, (state, action) =>
    adapter.updateOne(action.project, state)
  ),
  // Delete Project
  on(deleteProject.begin, (state) => {
    return { ...state, deleteProjectPending: true };
  }),
  on(deleteProject.success, (state, action) => {
    return {
      ...adapter.removeOne(action.id, state),
      deleteProjectPending: false,
    };
  }),
  on(deleteProject.failure, (state, action) => {
    return {
      ...state,
      deleteProjectPending: false,
      error: action.error,
    };
  })
);
export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
