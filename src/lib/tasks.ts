import { daysUntil } from './dates';
import type { Task, TaskStatus } from './types';

export type StatusFilter = TaskStatus | 'all';

export function filterByStatus(tasks: readonly Task[], status: StatusFilter): Task[] {
  return status === 'all' ? [...tasks] : tasks.filter((task) => task.status === status);
}

export function isOverdue(task: Task, today: Date): boolean {
  if (task.deadline === null) return false;
  if (task.status === 'done' || task.status === 'cancelled') return false;
  
  return daysUntil(task.deadline, today) < 0;
}

export function sortByDeadline(tasks: readonly Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (a.deadline === null && b.deadline === null) return a.id - b.id;
    if (a.deadline === null) return 1;
    if (b.deadline === null) return -1;
    
    const cmp = a.deadline.localeCompare(b.deadline);
    return cmp !== 0 ? cmp : a.id - b.id;
  });
}
