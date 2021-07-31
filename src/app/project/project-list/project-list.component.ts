import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IApplicationState } from 'src/app/application-state';
import { loadProjects } from '../ngrx/project.actions';
import { ErrorMessage } from 'src/app/shared/error-message';
import {
  error,
  loadProjectsPending,
  selectProjects,
} from '../ngrx/project.selectors';
import { IProject } from '../project.interface';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.sass'],
})
export class ProjectListComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private store: Store<IApplicationState>,
    public dialog: MatDialog
  ) {}
  projects$!: Observable<IProject[]>;
  loadProjectsPending$!: Observable<boolean>;
  deleteProjectPending$!: Observable<boolean>;
  error!: Subscription;

  displayedColumns: string[] = [
    'projectInfo',
    'projectManager',
    'assignedTo',
    'status',
    'action',
  ];

  ngOnInit(): void {
    this.store.dispatch(loadProjects.begin());
    this.projects$ = this.store.select(selectProjects);
    this.loadProjectsPending$ = this.store.select(loadProjectsPending);
    this.error = this.store.select(error).subscribe((error) => {
      if (error) {
        let errorDialog = this.dialog.open(ErrorMessage, {
          data: { message: error.message },
        });
        errorDialog.afterClosed().subscribe(() => {
          this.router.navigate(['']);
        });
      }
    });
  }
  ngOnDestroy() {
    this.error.unsubscribe();
  }
}

// export const fakeDb: IProject[] = [
//   {
//     projectName: 'Landing page',
//     creationDate: Date.now(),
//     projectManager: 'Walt Cosani',
//     description: 'some description',
//     assignedTo: 'Ignacio Truffa',
//     status: 'Enabled',
//   },
//   {
//     projectName: 'E-commerce Shop',
//     creationDate: Date.now(),
//     projectManager: 'Walt Cosani',
//     description: 'some description',
//     assignedTo: 'Ignacio Truffa',
//     status: 'Enabled',
//   },
//   {
//     projectName: 'CRM Linkroom',
//     creationDate: Date.now(),
//     projectManager: 'Walt Cosani',
//     description: 'some description',
//     assignedTo: 'Ignacio Truffa',
//     status: 'Enabled',
//   },
// ];
