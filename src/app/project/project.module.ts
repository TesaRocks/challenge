import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectNewComponent } from './project-new/project-new.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { StoreModule } from '@ngrx/store';
@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectNewComponent,
    ProjectEditComponent,
  ],
  imports: [CommonModule, StoreModule],
})
export class ProjectModule {}
