import { useState } from 'react';
import { formatDate } from '../lib/dates';
import { filterByStatus, isOverdue, sortByDeadline, type StatusFilter } from '../lib/tasks';
import type { Task, Volunteer } from '../lib/types';
import { StatusBadge } from './StatusBadge';

const filters: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Toate' },
  { value: 'todo', label: 'De făcut' },
  { value: 'in_progress', label: 'În lucru' },
  { value: 'done', label: 'Finalizate' },
  { value: 'cancelled', label: 'Anulate' },
];

interface TaskListProps {
  tasks: readonly Task[];
  volunteers: readonly Volunteer[];
  today: Date;
}

export function TaskList({ tasks, volunteers, today }: TaskListProps) {
  const [status, setStatus] = useState<StatusFilter>('all');
  const shown = sortByDeadline(filterByStatus(tasks, status));
  const nameOf = (id: number | null) => {
    const volunteer = volunteers.find((v) => v.id === id);
    return volunteer ? (volunteer.nickname ?? volunteer.name) : 'Neatribuit';
  };

  return (
    <section>
      <label className="field">
        <span>Status</span>
        <select value={status} onChange={(event) => setStatus(event.target.value as StatusFilter)}>
          {filters.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      </label>

      <p className="count">{shown.length} taskuri</p>

      <ul className="cards">
        {shown.map((task) => (
          <li key={task.id} className="card task-card">
            <div className="card-top">
              <h2 className="task-title">{task.title}</h2>
              <StatusBadge status={task.status} />
            </div>
            <dl className="task-meta">
              <div>
                <dt>Responsabil</dt>
                <dd>{nameOf(task.assigneeId)}</dd>
              </div>
              <div>
                <dt>Termen</dt>
                <dd>
                  {task.deadline ? formatDate(task.deadline) : 'Fără termen'}
                  {isOverdue(task, today) && <span className="badge badge-danger">Întârziat</span>}
                </dd>
              </div>
              <div>
                <dt>Puncte</dt>
                <dd>{task.points}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
}
