export type TaskStatus = 'todo' | 'in_progress' | 'done' | 'cancelled';

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  /** The volunteer doing the task; null while nobody is assigned. */
  assigneeId: number | null;
  /** An ISO date (YYYY-MM-DD), or null when the task has no deadline. */
  deadline: string | null;
  /** What the assignee earns once the task is done. */
  points: number;
}

export interface Volunteer {
  id: number;
  name: string;
  /** Shown instead of the name when set. */
  nickname: string | null;
  department: string;
  role: string;
}
