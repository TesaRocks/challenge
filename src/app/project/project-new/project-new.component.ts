import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IApplicationState } from 'src/app/application-state';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.sass'],
})
export class ProjectNewComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private store: Store<IApplicationState>,
    public dialog: MatDialog,
    private router: Router
  ) {}
  addProjectPending$!: Observable<boolean>;
  error!: Subscription;
  formNew: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(45)]],
    description: ['', [Validators.required, Validators.maxLength(45)]],
    manager: ['', [Validators.required]],
    assigned: ['', [Validators.required]],
    status: ['', [Validators.required]],
  });

  ngOnInit(): void {}
  onSubmit() {}
  hasError(
    inputName: 'name' | 'description' | 'manager' | 'assigned' | 'status',
    errorType: string
  ) {
    return this.formNew.get(inputName)?.hasError(errorType);
  }
}
