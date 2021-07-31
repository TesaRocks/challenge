import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IApplicationState } from 'src/app/application-state';
import { IProject } from '../project.interface';
import { IEmployee } from 'src/app/employees/employee.interface';
import { ErrorMessage } from 'src/app/shared/error-message';
import {
  error,
  loadEmployeesPending,
  selectEmployees,
} from '../../employees/ngrx/employee.selectors';
@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.sass'],
})
export class ProjectNewComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private store: Store<IApplicationState>,
    public dialog: MatDialog,
    private router: Router
  ) {}
  addProjectPending$!: Observable<boolean>;
  loadEmployeesPending$!: Observable<boolean>;
  error!: Subscription;
  employeeListSub!: Subscription;
  employeeList!: IEmployee[];

  formNew: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(45)]],
    description: ['', [Validators.required, Validators.maxLength(45)]],
    manager: ['', [Validators.required]],
    assigned: ['', [Validators.required]],
    status: ['', [Validators.required]],
  });

  ngOnInit(): void {
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
    //const newProject:IProject
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
