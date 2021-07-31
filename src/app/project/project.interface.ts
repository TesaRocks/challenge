export interface IProject {
  id?: string;
  projectName: string;
  creationDate: Date;
  projectManager: string;
  description: string;
  assignedTo: string;
  status: string;
}
