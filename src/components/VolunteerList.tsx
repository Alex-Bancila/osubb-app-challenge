import { useState } from 'react';
import type { Volunteer } from '../lib/types';
import { matchesVolunteer } from '../lib/search';

export function VolunteerList({ volunteers }: { volunteers: readonly Volunteer[] }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredVolunteers = volunteers.filter(v => matchesVolunteer(v, searchQuery));

    return (
        <section>
            <input
                type="text"
                placeholder="Search volunteers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    background: 'transparent',
                    color: 'inherit'
                }}
            />

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
