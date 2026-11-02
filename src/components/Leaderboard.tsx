import { useState } from 'react';
import { leaderboard, pointsByDepartment } from '../lib/points';
import type { Task, Volunteer } from '../lib/types';

interface LeaderboardProps {
  tasks: readonly Task[];
  volunteers: readonly Volunteer[];
}

export function Leaderboard({ tasks, volunteers }: LeaderboardProps) {
  // Stare pentru a comuta între vizualizarea pe voluntari sau departamente
  const [viewMode, setViewMode] = useState<'volunteers' | 'departments'>('volunteers');

  const rows = leaderboard(volunteers, tasks);
  const departmentRows = pointsByDepartment(volunteers, tasks);

  return (
    <section>
      {/* Grupul de butoane pentru comutarea clasamentului */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={() => setViewMode('volunteers')}
          style={{
            padding: '6px 12px',
            backgroundColor: viewMode === 'volunteers' ? '#007bff' : 'transparent',
            color: viewMode === 'volunteers' ? '#fff' : 'inherit',
            border: '1px solid #007bff',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Voluntari
        </button>
        <button
          onClick={() => setViewMode('departments')}
          style={{
            padding: '6px 12px',
            backgroundColor: viewMode === 'departments' ? '#007bff' : 'transparent',
            color: viewMode === 'departments' ? '#fff' : 'inherit',
            border: '1px solid #007bff',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Departamente
        </button>
      </div>

      <ol className="leaderboard">
        {viewMode === 'volunteers'
          ? rows.map((row, index) => (
              <li key={row.volunteer.id} className="card leaderboard-row">
                <span className="rank">{index + 1}</span>
                <span className="leaderboard-name">
                  {row.volunteer.nickname ?? row.volunteer.name}
                  <span className="muted"> · {row.volunteer.department}</span>
                </span>
                <span className="leaderboard-points">{row.points} p</span>
              </li>
            ))
          : departmentRows.map((row, index) => (
              <li key={row.department} className="card leaderboard-row">
                <span className="rank">{index + 1}</span>
                <span className="leaderboard-name">{row.department}</span>
                <span className="leaderboard-points">{row.points} p</span>
              </li>
            ))}
      </ol>
    </section>
  );
}
