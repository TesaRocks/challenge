import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IProject } from '../project.interface';

/** **************************************
 *  Load Projects
 ***************************************/

const loadProjectsBegin = createAction('[Projects] Load Projects Begin');
const loadProjectsSuccess = createAction(
  '[Projects] Load Projects Success',
  props<{ projects: IProject[] }>()
);
const loadProjectsFailure = createAction(
  '[Projects] Load Projects Failure',
  props<{ error: any }>()
);

export const loadProjects = {
  begin: loadProjectsBegin,
  success: loadProjectsSuccess,
  failure: loadProjectsFailure,
};
/** **************************************
 *  Load Project
 ***************************************/
const loadProjectBegin = createAction(
  '[Projects] Load Project Begin',
  props<{ id: number }>()
);
const loadProjectSuccess = createAction(
  '[Projects] Load Project Success',
  props<{ selectedProject: IProject }>()
);
const loadProjectFailure = createAction(
  '[Projects] Load Project Failure',
  props<{ error: any }>()
);
export const loadProject = {
  begin: loadProjectBegin,
  success: loadProjectSuccess,
  failure: loadProjectFailure,
};
/** **************************************
 *  Add Project
 ***************************************/

const addProjectSuccess = createAction(
  '[Projects] Add Project Success',
  props<{ Project: IProject }>()
);
const addProjectFailure = createAction(
  '[Projects] Add Project Failure',
  props<{ error: any }>()
);
export const addProject = {
  success: addProjectSuccess,
  failure: addProjectFailure,
};
/** **************************************
 *  Update Project
 ***************************************/

const updateProjectSuccess = createAction(
  '[Projects] Update Project success',
  props<{ project: Update<IProject> }>()
);
export const updateProject = {
  success: updateProjectSuccess,
};

/** **************************************
 *  Delete Project
 ***************************************/
const deleteProjectBegin = createAction(
  '[Projects] Delete Project begin',
  props<{ id: number }>()
);
const deleteProjectSuccess = createAction(
  '[Projects] Delete Project Success',
  props<{ id: number }>()
);
const deleteProjectFailure = createAction(
  '[Projects] Delete Project Failure',
  props<{ error: any }>()
);
export const deleteProject = {
  begin: deleteProjectBegin,
  success: deleteProjectSuccess,
  failure: deleteProjectFailure,
};
