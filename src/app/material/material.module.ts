import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatPaginatorModule,
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatPaginatorModule,
  ],
})
export class MaterialModule {}
