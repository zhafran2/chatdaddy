export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  dueDate?: string;
  status: TaskStatus;
  subTasks?: SubTask[];
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'not-started' | 'in-progress' | 'blocked' | 'done';

export interface Column {
  id: TaskStatus;
  title: string;
  color: string;
  bgColor: string;
}

export interface DragEndEvent {
  active: {
    id: string;
  };
  over: {
    id: string;
  } | null;
}