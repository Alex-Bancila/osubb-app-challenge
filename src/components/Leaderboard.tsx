import { useState } from 'react';
import { leaderboard, pointsByDepartment } from '../lib/points';
import type { Task, Volunteer } from '../lib/types';

interface LeaderboardProps {
  tasks: readonly Task[];
  volunteers: readonly Volunteer[];
}

export function Leaderboard({ tasks, volunteers }: LeaderboardProps) {
  const [view, setView] = useState('volunteers');
  const rows = view === 'volunteers'
    ? leaderboard(volunteers, tasks)
    : pointsByDepartment(volunteers, tasks);

  return (
    <section>
      <label className="field">
        <span>Clasament</span>
        <select value={view} onChange={(event) => setView(event.target.value)}>
          <option value="volunteers">Voluntari</option>
          <option value="departments">Departamente</option>
        </select>
      </label>
      <ol className="leaderboard" data-view={view}>
        {rows.map((row, index) => (
          <li key={'volunteer' in row ? row.volunteer.id : row.department} className="card leaderboard-row">
            <span className="rank">{index + 1}</span>
            <span className="leaderboard-name">
              {'volunteer' in row ? (
                <>
                  {row.volunteer.nickname ?? row.volunteer.name}
                  <span className="muted"> · {row.volunteer.department}</span>
                </>
              ) : (
                <>
                  {row.department}
                  <span className="muted">
                    {' · '}{row.volunteerCount} {row.volunteerCount === 1 ? 'voluntar' : 'voluntari'}
                  </span>
                </>
              )}
            </span>
            <span className="leaderboard-points">{row.points} p</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
