import { daysUntil } from './dates';
import type { Task, TaskStatus } from './types';

export type StatusFilter = TaskStatus | 'all';

/** The tasks with the chosen status, or every task for 'all'. */
export function filterByStatus(tasks: readonly Task[], status: StatusFilter): Task[] {
  return status === 'all' ? [...tasks] : tasks.filter((task) => task.status === status);
}

/**
 * Whether a task missed its deadline. A task due today is not overdue yet,
 * and a task that is finished (done or cancelled) is never overdue.
 */
export function isOverdue(task: Task, today: Date): boolean {
  if (task.deadline === null) return false;
  if (task.status === 'done' || task.status === 'cancelled') return false;
  return daysUntil(task.deadline, today) < 0;
}

export const sortByDeadline = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    // If 'a' has no deadline, move it to the end (return 1)
    if (a.deadline === null || a.deadline === undefined) return 1;
    
    // If 'b' has no deadline, move 'a' ahead of it (return -1)
    if (b.deadline === null || b.deadline === undefined) return -1;
    
    // Otherwise, sort chronologically by date string
    return a.deadline.localeCompare(b.deadline);
  });
};
