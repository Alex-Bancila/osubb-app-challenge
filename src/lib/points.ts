import type { Task, Volunteer } from './types';

export interface LeaderboardRow {
  volunteer: Volunteer;
  points: number;
}

/**
 * Points earned by each volunteer. Only a task that is done earns its points,
 * and only for the volunteer it is assigned to.
 */
export function pointsByVolunteer(tasks: readonly Task[]): Map<number, number> {
  const totals = new Map<number, number>();
  for (const task of tasks) {
    if (task.assigneeId === null) continue;
    if (task.status !== 'done') continue;
    totals.set(task.assigneeId, (totals.get(task.assigneeId) ?? 0) + task.points);
  }
  return totals;
}

/** Every volunteer with their points, most points first, then by name. */
export function leaderboard(
  volunteers: readonly Volunteer[],
  tasks: readonly Task[],
): LeaderboardRow[] {
  const totals = pointsByVolunteer(tasks);
  return volunteers
    .map((volunteer) => ({ volunteer, points: totals.get(volunteer.id) ?? 0 }))
    .sort(
      (a, b) =>
        b.points - a.points || a.volunteer.name.localeCompare(b.volunteer.name, 'ro'),
    );
}

export interface DepartmentRow {
  department: string;
  points: number;
}

/**
 * Every department with the points of its volunteers, most points first, then
 * by name. Same rules as `pointsByVolunteer`. A volunteer without a department
 * (an empty name) is left out, and so are the points of a task whose assignee
 * is not in the list.
 */
export function pointsByDepartment(
  volunteers: readonly Volunteer[],
  tasks: readonly Task[],
): DepartmentRow[] {
  const totals = pointsByVolunteer(tasks);
  const byDepartment = new Map<string, number>();
  for (const volunteer of volunteers) {
    const department = volunteer.department.trim();
    if (department === '') continue;
    byDepartment.set(
      department,
      (byDepartment.get(department) ?? 0) + (totals.get(volunteer.id) ?? 0),
    );
  }
  return [...byDepartment.entries()]
    .map(([department, points]) => ({ department, points }))
    .sort((a, b) => b.points - a.points || a.department.localeCompare(b.department, 'ro'));
}
