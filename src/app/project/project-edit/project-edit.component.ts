import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IApplicationState } from 'src/app/application-state';
import { updateHeader } from 'src/app/header/ngrx/header.actions';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
})
export class ProjectEditComponent implements OnInit {
  constructor(private store: Store<IApplicationState>) {}

  ngOnInit(): void {
    this.store.dispatch(updateHeader({ updatedHeader: 'Edit project' }));
  }
}
