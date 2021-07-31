import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IProject } from '../project.interface';

/** **************************************
 *  Load Projects
 ***************************************/

const loadProjectsBegin = createAction('[Project] Load Projects Begin');
const loadProjectsSuccess = createAction(
  '[Project] Load Projects Success',
  props<{ projects: IProject[] }>()
);
const loadProjectsFailure = createAction(
  '[Project] Load Projects Failure',
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
  '[Project] Load Project Begin',
  props<{ id: number }>()
);
const loadProjectSuccess = createAction(
  '[Project] Load Project Success',
  props<{ selectedProject: IProject }>()
);
const loadProjectFailure = createAction(
  '[Project] Load Project Failure',
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
const addProjectBegin = createAction(
  '[Project] Add Project Begin',
  props<{ project: IProject }>()
);
const addProjectSuccess = createAction(
  '[Project] Add Project Success',
  props<{ project: IProject }>()
);
const addProjectFailure = createAction(
  '[Project] Add Project Failure',
  props<{ error: any }>()
);
export const addProject = {
  begin: addProjectBegin,
  success: addProjectSuccess,
  failure: addProjectFailure,
};
/** **************************************
 *  Update Project
 ***************************************/

const updateProjectSuccess = createAction(
  '[Project] Update Project success',
  props<{ project: Update<IProject> }>()
);
export const updateProject = {
  success: updateProjectSuccess,
};

/** **************************************
 *  Delete Project
 ***************************************/
const deleteProjectBegin = createAction(
  '[Project] Delete Project begin',
  props<{ id: string }>()
);
const deleteProjectSuccess = createAction(
  '[Project] Delete Project Success',
  props<{ id: string }>()
);
const deleteProjectFailure = createAction(
  '[Project] Delete Project Failure',
  props<{ error: any }>()
);
export const deleteProject = {
  begin: deleteProjectBegin,
  success: deleteProjectSuccess,
  failure: deleteProjectFailure,
};
