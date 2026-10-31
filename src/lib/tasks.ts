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
  if (task.status === 'done' || task.status === 'cancelled') return false;
  if (task.deadline === null) return false;
  return daysUntil(task.deadline, today) < 0;
}

/** Earliest deadline first; tasks without a deadline go last. */
export function sortByDeadline(tasks: readonly Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (a.deadline === null && b.deadline === null) return 0;
    if (a.deadline === null) return -1;
    if (b.deadline === null) return 1;
    return a.deadline.localeCompare(b.deadline);
  });
}
