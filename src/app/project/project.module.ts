import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectNewComponent } from './project-new/project-new.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromProject from './ngrx/project.reducer';
import { ProjectEffects } from './ngrx/project.effects';
@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectNewComponent,
    ProjectEditComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromProject.projectsFeatureKey, fromProject.reducer),
    EffectsModule.forFeature([ProjectEffects]),
  ],
})
export class ProjectModule {}
