import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IApplicationState } from 'src/app/application-state';
import { loadProjects } from '../ngrx/project.actions';
import { selectProjects } from '../ngrx/project.selectors';
import { IProject } from '../project.interface';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.sass'],
})
export class ProjectListComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store<IApplicationState>
  ) {}
  projects$!: Observable<IProject[]>;

  displayedColumns: string[] = [
    'projectInfo',
    'projectManager',
    'assignedTo',
    'status',
    'action',
  ];

  ngOnInit(): void {}
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
