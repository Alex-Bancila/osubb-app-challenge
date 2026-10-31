import { useState } from 'react';
import { matchesVolunteer } from '../lib/search';
import type { Volunteer } from '../lib/types';

export function VolunteerList({ volunteers }: { volunteers: readonly Volunteer[] }) {
  const [query, setQuery] = useState('');
  const shown = volunteers.filter((volunteer) => matchesVolunteer(volunteer, query));

  return (
    <section>
      <label className="field">
        <span>Caută</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Nume sau poreclă"
        />
      </label>

      <p className="count">{shown.length} voluntari</p>

      <ul className="cards">
        {shown.map((volunteer) => (
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
