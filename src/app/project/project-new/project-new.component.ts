import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IApplicationState } from 'src/app/application-state';
import { IProject } from '../project.interface';
import { IEmployee } from 'src/app/employees/employee.interface';
import { ErrorMessage } from 'src/app/shared/error-message';
import {
  error,
  loadEmployeesPending,
  selectEmployees,
} from '../../employees/ngrx/employee.selectors';
import { updateHeader } from 'src/app/header/ngrx/header.actions';
import { loadEmployees } from 'src/app/employees/ngrx/employee.actions';
import {
  addProject,
  loadProject,
  updateProject,
} from '../ngrx/project.actions';
import { Update } from '@ngrx/entity';
import {
  addProjectPending,
  loadProjectPending,
  selectproject,
  updateProjectPending,
} from '../ngrx/project.selectors';
@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.css'],
})
export class ProjectNewComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private store: Store<IApplicationState>,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  id!: string;
  editMode = false;
  addProjectPending$!: Observable<boolean>;
  loadEmployeesPending$!: Observable<boolean>;
  error!: Subscription;
  employeeListSub!: Subscription;
  employeeList!: IEmployee[];
  loadProjectPending$!: Observable<boolean>;
  updatePending$!: Observable<boolean>;

  formNew: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(45)]],
    description: ['', [Validators.required, Validators.maxLength(45)]],
    manager: ['', [Validators.required]],
    assigned: ['', [Validators.required]],
    status: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.editMode = this.id ? true : false;
    if (this.editMode) {
      this.store.dispatch(updateHeader({ updatedHeader: 'Edit project' }));
      this.store.dispatch(loadProject.begin({ id: this.id }));
      this.store.select(selectproject).subscribe((project) => {
        if (project !== null) {
          let formProject = {
            name: project.projectName,
            description: project.description,
            manager: project.projectManager,
            assigned: project.assignedTo,
            status: project.status,
          };
          this.formNew.setValue(formProject);
        }
      });
      this.loadProjectPending$ = this.store.select(loadProjectPending);
    } else {
      this.store.dispatch(updateHeader({ updatedHeader: 'Add project' }));
    }
    this.store.dispatch(loadEmployees.begin());
    this.employeeListSub = this.store
      .select(selectEmployees)
      .subscribe((employees) => {
        this.employeeList = employees;
      });
    this.loadEmployeesPending$ = this.store.select(loadEmployeesPending);
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
  onSubmit() {
    const updateOrNewProject: IProject = {
      id: this.id,
      projectName: this.formNew.value.name,
      creationDate: new Date(),
      projectManager: this.formNew.value.manager.name,
      description: this.formNew.value.description,
      assignedTo: this.formNew.value.assigned.name,
      status: this.formNew.value.status,
    };
    if (this.editMode) {
      const update: Update<IProject> = {
        id: this.id,
        changes: updateOrNewProject,
      };
      this.store.dispatch(updateProject.success({ project: update }));
      this.updatePending$ = this.store.select(updateProjectPending);
    } else {
      this.store.dispatch(addProject.begin({ project: updateOrNewProject }));
      this.addProjectPending$ = this.store.select(addProjectPending);
    }

    //this.store.dispatch(updateHeader({ updatedHeader: 'My projects' }));
    //this.router.navigate(['/projects']);
    this.formNew.reset();
  }
  hasError(
    inputName: 'name' | 'description' | 'manager' | 'assigned' | 'status',
    errorType: string
  ) {
    return this.formNew.get(inputName)?.hasError(errorType);
  }
  ngOnDestroy() {
    this.employeeListSub.unsubscribe();
    this.error.unsubscribe();
  }
}
