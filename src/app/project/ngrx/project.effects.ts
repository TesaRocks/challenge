import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import {
  loadProject,
  loadProjects,
  addProject,
  deleteProject,
  updateProject,
} from './project.actions';
@Injectable()
export class ProjectEffects {
  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjects.begin),
      mergeMap(() =>
        this.projectService.fetchProjects().pipe(
          map((projects) => loadProjects.success({ projects: projects })),
          catchError((error) => of(loadProjects.failure({ error })))
        )
      )
    )
  );
  loadProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProject.begin),
      mergeMap((action) =>
        this.projectService.fetchProject(action.id).pipe(
          map((project) => loadProject.success({ selectedProject: project })),
          catchError((error) => of(loadProject.failure({ error })))
        )
      )
    )
  );
  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProject.begin),
      mergeMap((action) =>
        this.projectService.newProject(action.project).pipe(
          map((project) => addProject.success({ project })),
          catchError((error) => of(addProject.failure({ error })))
        )
      ),
      tap(() => this.router.navigate(['projects']))
    )
  );
  updateProject$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateProject.success),
        concatMap((action) =>
          this.projectService.updateProject(
            action.project.id,
            action.project.changes
          )
        ),
        tap(() => this.router.navigate(['projects']))
      ),
    { dispatch: false }
  );
  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProject.begin),
      mergeMap((action) =>
        this.projectService.deleteProject(action.id).pipe(
          map(() => deleteProject.success({ id: action.id })),
          catchError((error) => of(deleteProject.failure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private router: Router
  ) {}
}
