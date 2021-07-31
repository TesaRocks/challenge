import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IApplicationState } from 'src/app/application-state';
import { deleteProject, loadProjects } from '../ngrx/project.actions';
import { ErrorMessage } from 'src/app/shared/error-message';
import {
  deleteProjectPending,
  error,
  loadProjectsPending,
  selectProjects,
} from '../ngrx/project.selectors';
import { IProject } from '../project.interface';
import { DeleteConfirm } from 'src/app/shared/delete-confirm';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
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
  openDeleteDialog(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirm);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(deleteProject.begin({ id: id }));
        this.deleteProjectPending$ = this.store.select(deleteProjectPending);
      }
    });
  }
  ngOnDestroy() {
    this.error.unsubscribe();
  }
}
