import type { Task, Volunteer } from './types';

export interface LeaderboardRow {
  volunteer: Volunteer;
  points: number;
}

export interface DepartmentLeaderboardRow {
  department: string;
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
    if (task.status === 'todo' || task.status === 'in_progress' || task.status === 'cancelled') continue;
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

/** Every department with its total points, most points first, then by department name. */
export function pointsByDepartment(
  volunteers: readonly Volunteer[],
  tasks: readonly Task[],
): DepartmentLeaderboardRow[] {
  const volunteerPointsMap = pointsByVolunteer(tasks);
  const departmentTotals = new Map<string, number>();

  // 1. Inițializează toate departamentele cunoscute cu 0 puncte
  for (const volunteer of volunteers) {
    if (volunteer.department && !departmentTotals.has(volunteer.department)) {
      departmentTotals.set(volunteer.department, 0);
    }
  }

  // 2. Acumulează punctele voluntarilor în departamentul din care fac parte
  for (const volunteer of volunteers) {
    if (volunteer.department) {
      const currentPoints = departmentTotals.get(volunteer.department) ?? 0;
      const volunteerPoints = volunteerPointsMap.get(volunteer.id) ?? 0;
      departmentTotals.set(volunteer.department, currentPoints + volunteerPoints);
    }
  }

  // 3. Transformă harta în array-ul final de rânduri pentru clasament
  const result: DepartmentLeaderboardRow[] = [];
  departmentTotals.forEach((points, department) => {
    result.push({ department, points });
  });

  // 4. Sortează: cele mai multe puncte primele, iar la egalitate, alfabetic cu suport pentru limba română ('ro')
  return result.sort(
    (a, b) => b.points - a.points || a.department.localeCompare(b.department, 'ro')
  );
}
