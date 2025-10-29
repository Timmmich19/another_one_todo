export type Status = 'pending' | 'in_progress' | 'done';

export interface TaskType {
  id: string;
  title: string;
  description?: string;
  status: Status;
  created_at: string;
}

export interface TaskCreate {
  title: string;
  description?: string;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  status?: Status;
}