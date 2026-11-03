import type { Task, Volunteer } from './types';

export interface LeaderboardRow {
  volunteer: Volunteer;
  points: number;
}

export function pointsByVolunteer(tasks: readonly Task[]): Map<number, number> {
  const totals = new Map<number, number>();
  for (const task of tasks) {
    if (task.assigneeId === null) continue;
    if (task.status !== 'done') continue;
    totals.set(task.assigneeId, (totals.get(task.assigneeId) ?? 0) + task.points);
  }
  return totals;
}

export function leaderboard(
  volunteers: readonly Volunteer[],
  tasks: readonly Task[],
): LeaderboardRow[] {
  const totals = pointsByVolunteer(tasks);
  return volunteers
    .map((volunteer) => ({ volunteer, points: totals.get(volunteer.id) ?? 0 }))
    .sort(
      (a, b) =>
        b.points - a.points ||
        a.volunteer.name.localeCompare(b.volunteer.name, 'ro') ||
        a.volunteer.id - b.volunteer.id,
    );
}
