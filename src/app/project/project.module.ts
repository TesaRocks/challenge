import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectNewComponent } from './project-new/project-new.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromProject from './ngrx/project.reducer';
import { ProjectEffects } from './ngrx/project.effects';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProjectListComponent, ProjectNewComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromProject.projectsFeatureKey, fromProject.reducer),
    EffectsModule.forFeature([ProjectEffects]),
  ],
})
export class ProjectModule {}
