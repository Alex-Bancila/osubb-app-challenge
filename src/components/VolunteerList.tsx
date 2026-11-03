import { useState } from 'react';
import type { Volunteer } from '../lib/types';
import { matchesVolunteer } from '../lib/search';

export function VolunteerList({ volunteers }: { volunteers: readonly Volunteer[] }) {
  const [query,  setQuery] = useState("");
  const filteredVolunteers = volunteers.filter(volunteer =>
    matchesVolunteer(volunteer , query)
  )
  
  return (
    <section>
      {
        <div style={{marginBottom: '1rem'}}>
          <input
            type = "search"
            placeholder='Cauta voluntar...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      }

      <p className="count">{filteredVolunteers.length} voluntari</p>

      <ul className="cards">
        {filteredVolunteers.map((volunteer) => (
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
