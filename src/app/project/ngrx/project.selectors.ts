import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  IProjectsInitialState,
  projectsFeatureKey,
  selectAll,
} from './project.reducer';

export const selectProjectState =
  createFeatureSelector<IProjectsInitialState>(projectsFeatureKey);

export const selectProjects = createSelector(selectProjectState, selectAll);
export const selectproject = createSelector(
  selectProjectState,
  (state: IProjectsInitialState) => state.selectedProject
);

export const error = createSelector(
  selectProjectState,
  (state: IProjectsInitialState) => state.error
);
export const loadProjectsPending = createSelector(
  selectProjectState,
  (state: IProjectsInitialState) => state.loadProjectPending
);

export const deleteProjectPending = createSelector(
  selectProjectState,
  (state: IProjectsInitialState) => state.deleteProjectPending
);
export const updateProjectPending = createSelector(
  selectProjectState,
  (state: IProjectsInitialState) => state.updateProjectPending
);
export const loadProjectPending = createSelector(
  selectProjectState,
  (state: IProjectsInitialState) => state.loadProjectPending
);
export const addProjectPending = createSelector(
  selectProjectState,
  (state: IProjectsInitialState) => state.addProjectPending
);
