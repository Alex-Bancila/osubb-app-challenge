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
