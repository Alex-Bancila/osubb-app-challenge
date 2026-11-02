import { leaderboard, pointsByVolunteer, pointsByDepartment } from './points';
import type { Task, Volunteer } from './types';

function task(overrides: Partial<Task>): Task {
  return {
    id: 1,
    title: 'Task',
    status: 'done',
    assigneeId: 1,
    deadline: null,
    points: 10,
    ...overrides,
  };
}

function volunteer(id: number, name: string): Volunteer {
  return { id, name, nickname: null, department: 'IT', role: 'Voluntar' };
}

describe('pointsByVolunteer', () => {
  it('adds up the points of the done tasks', () => {
    const totals = pointsByVolunteer([
      task({ id: 1, assigneeId: 1, points: 10 }),
      task({ id: 2, assigneeId: 1, points: 15 }),
      task({ id: 3, assigneeId: 2, points: 5 }),
    ]);
    expect(totals.get(1)).toBe(25);
    expect(totals.get(2)).toBe(5);
  });

  it('gives nothing for a task that is still open', () => {
    const totals = pointsByVolunteer([
      task({ status: 'todo', points: 10 }),
      task({ status: 'in_progress', points: 20 }),
    ]);
    expect(totals.get(1)).toBeUndefined();
  });

  it('gives nothing for a cancelled task', () => {
    const totals = pointsByVolunteer([
      task({ id: 1, status: 'done', points: 10 }),
      task({ id: 2, status: 'cancelled', points: 30 }),
    ]);
    expect(totals.get(1)).toBe(10);
  });

  it('ignores a task nobody is assigned to', () => {
    const totals = pointsByVolunteer([task({ assigneeId: null, points: 10 })]);
    expect(totals.size).toBe(0);
  });
});

describe('leaderboard', () => {
  const volunteers = [volunteer(1, 'Bianca'), volunteer(2, 'Andrei'), volunteer(3, 'Cosmin')];

  it('lists the most points first', () => {
    const rows = leaderboard(volunteers, [
      task({ id: 1, assigneeId: 1, points: 10 }),
      task({ id: 2, assigneeId: 3, points: 25 }),
    ]);
    expect(rows.map((row) => [row.volunteer.name, row.points])).toEqual([
      ['Cosmin', 25],
      ['Bianca', 10],
      ['Andrei', 0],
    ]);
  });

  it('orders volunteers with the same points by name', () => {
    const rows = leaderboard(volunteers, []);
    expect(rows.map((row) => row.volunteer.name)).toEqual(['Andrei', 'Bianca', 'Cosmin']);
  });
});

describe('pointsByDepartment', () => {
  it('returns an empty array if there are no volunteers', () => {
    expect(pointsByDepartment([], [])).toEqual([]);
  });

  it('aggregates points correctly for each department and sorts descending', () => {
    const mockVolunteers = [
      { ...volunteer(1, 'Alice'), department: 'IT' },
      { ...volunteer(2, 'Bob'), department: 'HR' },
      { ...volunteer(3, 'Charlie'), department: 'IT' },
    ];

    const mockTasks = [
      task({ id: 101, assigneeId: 1, points: 10 }), // Alice (IT) +10
      task({ id: 102, assigneeId: 2, points: 5 }),  // Bob (HR) +5
      task({ id: 103, assigneeId: 3, points: 20 }), // Charlie (IT) +20
    ];

    const result = pointsByDepartment(mockVolunteers, mockTasks);

    expect(result).toEqual([
      { department: 'IT', points: 30 },
      { department: 'HR', points: 5 }
    ]);
  });

  it('sorts alphabetically when departments have tied points', () => {
    const mockVolunteers = [
      { ...volunteer(1, 'Alice'), department: 'PR' },
      { ...volunteer(2, 'Bob'), department: 'FR' },
    ];

    const result = pointsByDepartment(mockVolunteers, []);

    expect(result.map(r => r.department)).toEqual(['FR', 'PR']);
  });

  it('ignores points and departments for volunteers with null or empty department strings', () => {
    const mockVolunteers = [
      { ...volunteer(1, 'Alice'), department: '' },
      { ...volunteer(2, 'Bob'), department: 'HR' },
    ];

    const mockTasks = [
      task({ id: 101, assigneeId: 1, points: 50 }),
      task({ id: 102, assigneeId: 2, points: 10 }),
    ];

    const result = pointsByDepartment(mockVolunteers, mockTasks);

    expect(result).toEqual([
      { department: 'HR', points: 10 }
    ]);
  });
});
