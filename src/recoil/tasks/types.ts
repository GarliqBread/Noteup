export enum TasksSortKey {
  LAST_UPDATED = "lastUpdated",
  TITLE = "title",
  CREATED_DATE = "created_date",
  DOING = "doing",
  DONE = "done",
  TO_DO = "todo",
}

export type Task = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  projectId?: string;
  taskStatus: string;
};

export type Project = {
  id: string;
  title: string;
};

export type NotesState = {
  tasks: Task[];
  keyword: string;
  sortBy: keyof TasksSortKey;
  selectedTaskId: string | null;
};

export type ProjectState = {
  projects: Project[];
  selectedProjectId: string | null;
  projectListOpen: boolean;
};
