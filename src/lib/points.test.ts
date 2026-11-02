import { leaderboard, pointsByDepartment, pointsByVolunteer } from './points';
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

describe('pointsByDepartment', () => {
  const volunteers = [
    volunteer(1, 'Ana'),
    volunteer(2, 'Bianca'),
    { ...volunteer(3, 'Cosmin'), department: 'PR' },
    { ...volunteer(4, 'Dan'), department: 'HR' },
  ];

  it('combines volunteers in each department and sorts by total points', () => {
    expect(pointsByDepartment(volunteers, [
      task({ id: 1, assigneeId: 1, points: 10 }),
      task({ id: 2, assigneeId: 2, points: 15 }),
      task({ id: 3, assigneeId: 3, points: 30 }),
    ])).toEqual([
      { department: 'PR', points: 30 },
      { department: 'IT', points: 25 },
      { department: 'HR', points: 0 },
    ]);
  });

  it('includes departments with no points and orders ties by name', () => {
    expect(pointsByDepartment(volunteers, [])).toEqual([
      { department: 'HR', points: 0 },
      { department: 'IT', points: 0 },
      { department: 'PR', points: 0 },
    ]);
  });

  it('counts only done tasks assigned to known volunteers', () => {
    const tasks = [
      task({ id: 1, status: 'done', points: 10 }),
      task({ id: 2, status: 'cancelled', points: 20 }),
      task({ id: 3, status: 'todo', points: 30 }),
      task({ id: 4, status: 'in_progress', points: 40 }),
      task({ id: 5, assigneeId: null, points: 50 }),
      task({ id: 6, assigneeId: 999, points: 60 }),
    ];
    expect(pointsByDepartment([volunteer(1, 'Ana')], tasks)).toEqual([
      { department: 'IT', points: 10 },
    ]);
    expect(pointsByDepartment([], tasks)).toEqual([]);
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
