import { filterByStatus, isOverdue, sortByDeadline } from './tasks';
import type { Task } from './types';

function task(overrides: Partial<Task>): Task {
  return {
    id: 1,
    title: 'Task',
    status: 'todo',
    assigneeId: 1,
    deadline: null,
    points: 10,
    ...overrides,
  };
}

const today = new Date(2026, 9, 20); // 20 October 2026

describe('filterByStatus', () => {
  const tasks = [
    task({ id: 1, status: 'todo' }),
    task({ id: 2, status: 'done' }),
    task({ id: 3, status: 'todo' }),
  ];

  it('keeps only the tasks with the chosen status', () => {
    expect(filterByStatus(tasks, 'todo').map((t) => t.id)).toEqual([1, 3]);
  });

  it('keeps every task for "all"', () => {
    expect(filterByStatus(tasks, 'all')).toHaveLength(3);
  });
});

describe('isOverdue', () => {
  it('is true for an open task whose deadline has passed', () => {
    expect(isOverdue(task({ deadline: '2026-10-19' }), today)).toBe(true);
  });

  it('is false for a task due today', () => {
    expect(isOverdue(task({ deadline: '2026-10-20' }), today)).toBe(false);
  });

  it('is false for a task without a deadline', () => {
    expect(isOverdue(task({ deadline: null }), today)).toBe(false);
  });

  it('is false for a done task, even after its deadline', () => {
    expect(isOverdue(task({ status: 'done', deadline: '2026-10-01' }), today)).toBe(false);
  });

  it('is false for a cancelled task, even after its deadline', () => {
    expect(isOverdue(task({ status: 'cancelled', deadline: '2026-10-01' }), today)).toBe(
      false,
    );
  });
});

describe('sortByDeadline', () => {
  it('puts the earliest deadline first', () => {
    const tasks = [
      task({ id: 1, deadline: '2026-11-10' }),
      task({ id: 2, deadline: '2026-10-25' }),
      task({ id: 3, deadline: '2026-12-01' }),
    ];
    expect(sortByDeadline(tasks).map((t) => t.id)).toEqual([2, 1, 3]);
  });

  it('puts the tasks without a deadline last', () => {
    const tasks = [
      task({ id: 1, deadline: null }),
      task({ id: 2, deadline: '2026-10-25' }),
      task({ id: 3, deadline: null }),
      task({ id: 4, deadline: '2026-10-21' }),
    ];
    expect(sortByDeadline(tasks).map((t) => t.id)).toEqual([4, 2, 1, 3]);
  });

  it('leaves the list it was given untouched', () => {
    const tasks = [task({ id: 1, deadline: '2026-11-10' }), task({ id: 2, deadline: '2026-10-25' })];
    sortByDeadline(tasks);
    expect(tasks.map((t) => t.id)).toEqual([1, 2]);
  });
});
