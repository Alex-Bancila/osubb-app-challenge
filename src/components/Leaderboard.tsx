import { useState } from 'react';
import { leaderboard, pointsByDepartment } from '../lib/points';
import type { Task, Volunteer } from '../lib/types';

interface LeaderboardProps {
  tasks: readonly Task[];
  volunteers: readonly Volunteer[];
}

type LeaderboardView = 'volunteers' | 'departments';

const views: { id: LeaderboardView; label: string }[] = [
  { id: 'volunteers', label: 'Voluntari' },
  { id: 'departments', label: 'Departamente' },
];

export function Leaderboard({ tasks, volunteers }: LeaderboardProps) {
  const [view, setView] = useState<LeaderboardView>('volunteers');
  const rows = view === 'volunteers'
    ? leaderboard(volunteers, tasks).map((row) => ({
        id: row.volunteer.id,
        name: row.volunteer.nickname ?? row.volunteer.name,
        department: row.volunteer.department,
        points: row.points,
      }))
    : pointsByDepartment(volunteers, tasks).map((row) => ({
        id: row.department,
        name: row.department,
        department: null,
        points: row.points,
      }));

  return (
    <section>
      <div className="tabs" role="group" aria-label="Tip clasament">
        {views.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === view ? 'tab tab-active' : 'tab'}
            aria-pressed={item.id === view}
            onClick={() => setView(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <ol className="leaderboard" aria-label={view === 'volunteers' ? 'Clasament voluntari' : 'Clasament departamente'}>
        {rows.map((row, index) => (
          <li key={row.id} className="card leaderboard-row">
            <span className="rank">{index + 1}</span>
            <span className="leaderboard-name">
              {row.name}
              {row.department && <span className="muted"> · {row.department}</span>}
            </span>
            <span className="leaderboard-points">{row.points} p</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
