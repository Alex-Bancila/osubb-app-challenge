import { useState } from 'react';
import { leaderboard, pointsByDepartment } from '../lib/points';
import type { Task, Volunteer } from '../lib/types';

interface LeaderboardProps {
  tasks: readonly Task[];
  volunteers: readonly Volunteer[];
}

type View = 'volunteers' | 'departments';

const views: { id: View; label: string }[] = [
  { id: 'volunteers', label: 'Voluntari' },
  { id: 'departments', label: 'Departamente' },
];

export function Leaderboard({ tasks, volunteers }: LeaderboardProps) {
  const [view, setView] = useState<View>('volunteers');
  const rows = leaderboard(volunteers, tasks);
  const departmentRows = pointsByDepartment(volunteers, tasks);

  return (
    <section>
      <div className="tabs" role="group" aria-label="Tipul clasamentului">
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

      {view === 'volunteers' ? (
        <ol className="leaderboard">
          {rows.map((row, index) => (
            <li key={row.volunteer.id} className="card leaderboard-row">
              <span className="rank">{index + 1}</span>
              <span className="leaderboard-name">
                {row.volunteer.nickname ?? row.volunteer.name}
                <span className="muted"> · {row.volunteer.department}</span>
              </span>
              <span className="leaderboard-points">{row.points} p</span>
            </li>
          ))}
        </ol>
      ) : (
        <ol className="leaderboard">
          {departmentRows.map((row, index) => (
            <li key={row.department} className="card leaderboard-row">
              <span className="rank">{index + 1}</span>
              <span className="leaderboard-name">{row.department}</span>
              <span className="leaderboard-points">{row.points} p</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
