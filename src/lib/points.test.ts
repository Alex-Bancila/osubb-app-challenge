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

function volunteer(id: number, name: string, department = 'IT'): Volunteer {
  return { id, name, nickname: null, department, role: 'Voluntar' };
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
  const volunteers = [
    volunteer(1, 'Ana', 'IT'),
    volunteer(2, 'Bogdan', 'IT'),
    volunteer(3, 'Carla', 'Financiar'),
  ];

  it('adds up the points of every volunteer in a department, most points first', () => {
    const rows = pointsByDepartment(volunteers, [
      task({ id: 1, assigneeId: 1, points: 10 }),
      task({ id: 2, assigneeId: 2, points: 5 }),
      task({ id: 3, assigneeId: 3, points: 20 }),
    ]);
    expect(rows).toEqual([
      { department: 'Financiar', points: 20 },
      { department: 'IT', points: 15 },
    ]);
  });

  it('lists a department with no points, with 0', () => {
    const rows = pointsByDepartment(volunteers, [task({ assigneeId: 1, points: 10 })]);
    expect(rows).toEqual([
      { department: 'IT', points: 10 },
      { department: 'Financiar', points: 0 },
    ]);
  });

  it('gives nothing for cancelled and open tasks', () => {
    const rows = pointsByDepartment(volunteers, [
      task({ id: 1, assigneeId: 1, status: 'cancelled', points: 30 }),
      task({ id: 2, assigneeId: 3, status: 'todo', points: 30 }),
      task({ id: 3, assigneeId: 3, status: 'in_progress', points: 30 }),
      task({ id: 4, assigneeId: 3, status: 'done', points: 5 }),
    ]);
    expect(rows).toEqual([
      { department: 'Financiar', points: 5 },
      { department: 'IT', points: 0 },
    ]);
  });

  it('orders departments with the same points by name', () => {
    const rows = pointsByDepartment(
      [volunteer(1, 'Ana', 'Resurse Umane'), volunteer(2, 'Bogdan', 'IT'), volunteer(3, 'Carla', 'Financiar')],
      [task({ id: 1, assigneeId: 1, points: 10 }), task({ id: 2, assigneeId: 2, points: 10 })],
    );
    expect(rows.map((row) => row.department)).toEqual(['IT', 'Resurse Umane', 'Financiar']);
  });

  it('leaves out a volunteer without a department', () => {
    const rows = pointsByDepartment(
      [volunteer(1, 'Ana', ''), volunteer(2, 'Bogdan', '   '), volunteer(3, 'Carla', 'IT')],
      [task({ id: 1, assigneeId: 1, points: 50 }), task({ id: 2, assigneeId: 3, points: 5 })],
    );
    expect(rows).toEqual([{ department: 'IT', points: 5 }]);
  });

  it('ignores tasks nobody is assigned to, or assigned to an unknown volunteer', () => {
    const rows = pointsByDepartment(volunteers, [
      task({ id: 1, assigneeId: null, points: 10 }),
      task({ id: 2, assigneeId: 99, points: 10 }),
    ]);
    expect(rows.map((row) => row.points)).toEqual([0, 0]);
  });

  it('returns an empty list when there are no volunteers', () => {
    expect(pointsByDepartment([], [task({ points: 10 })])).toEqual([]);
  });

  it('lists every department with 0 when there are no tasks', () => {
    expect(pointsByDepartment(volunteers, [])).toEqual([
      { department: 'Financiar', points: 0 },
      { department: 'IT', points: 0 },
    ]);
  });
});
