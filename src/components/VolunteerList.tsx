import { useState } from 'react';
import type { Volunteer } from '../lib/types';

// We put the utility function right here so we don't have to deal with broken import paths!
function matchesVolunteer(volunteer: Volunteer, query: string): boolean {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return true;

  const cleanText = (text: string) =>
    text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  const normalizedQuery = cleanText(trimmedQuery);
  const normalizedName = cleanText(volunteer.name);
  const normalizedNickname = volunteer.nickname ? cleanText(volunteer.nickname) : '';

  return (
    normalizedName.includes(normalizedQuery) ||
    normalizedNickname.includes(normalizedQuery)
  );
}

export function VolunteerList({ volunteers }: { volunteers: readonly Volunteer[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVolunteers = volunteers.filter((volunteer) =>
    matchesVolunteer(volunteer, searchQuery)
  );

  return (
    <section>
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Caută un voluntar (nume sau nickname)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="field select"
          style={{
            width: '100%',
            padding: '10px 14px',
            fontSize: '1rem',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            background: 'var(--surface)',
            color: 'var(--text)',
          }}
        />
      </div>

      <p className="count">
        {filteredVolunteers.length === volunteers.length
          ? `${volunteers.length} voluntari`
          : `Am găsit ${filteredVolunteers.length} din ${volunteers.length} voluntari`}
      </p>

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
