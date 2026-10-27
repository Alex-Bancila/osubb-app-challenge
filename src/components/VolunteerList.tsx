import type { Volunteer } from '../lib/types';

export function VolunteerList({ volunteers }: { volunteers: readonly Volunteer[] }) {
  return (
    <section>
      <p className="count">{volunteers.length} voluntari</p>

      <ul className="cards">
        {volunteers.map((volunteer) => (
          <li key={volunteer.id} className="card">
            <h2>
              {volunteer.nickname ?? volunteer.name}
              {volunteer.nickname && <span className="muted"> · {volunteer.name}</span>}
            </h2>
            <p className="muted">
              {volunteer.department} · {volunteer.role}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
