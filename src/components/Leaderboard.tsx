import { leaderboard } from '../lib/points';
import type { Task, Volunteer } from '../lib/types';

interface LeaderboardProps {
  tasks: readonly Task[];
  volunteers: readonly Volunteer[];
}

export function Leaderboard({ tasks, volunteers }: LeaderboardProps) {
  const rows = leaderboard(volunteers, tasks);

  return (
    <section>
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
    </section>
  );
}
