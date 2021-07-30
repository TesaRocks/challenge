import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProject } from './project.interface';
@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(private http: HttpClient) {}

  fetchProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(
      'https://estoeschallenge-default-rtdb.firebaseio.com/projects.json'
    );
  }
  fetchProject(id: number): Observable<IProject> {
    return this.http.get<IProject>(
      `https://estoeschallenge-default-rtdb.firebaseio.com/projects.json`
    );
  }
  updateProject(
    id: string | number,
    changes: Partial<IProject>
  ): Observable<IProject> {
    return this.http.put<IProject>(
      `https://estoeschallenge-default-rtdb.firebaseio.com/projects.json`,
      changes
    );
  }
  deleteProject(id: number) {
    return this.http.delete<string>(`/${id}`);
  }
  newProject(project: IProject): Observable<IProject> {
    return this.http.post<IProject>(
      'https://estoeschallenge-default-rtdb.firebaseio.com/projects.json',
      project
    );
  }
}
