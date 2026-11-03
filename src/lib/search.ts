import type { Volunteer } from './types';

/**
 * Whether the search text finds this volunteer: it appears in their name or
 * in their nickname, ignoring upper/lower case and diacritics, so "stefan"
 * finds "Ștefan". An empty search finds everyone.
 */
export function matchesVolunteer(volunteer: Volunteer, query: string): boolean {
  // An empty search query finds everyone
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return true;

  // Helper to remove accents/diacritics and convert to lower case
  const cleanText = (text: string) =>
    text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  const normalizedQuery = cleanText(trimmedQuery);
  const normalizedName = cleanText(volunteer.name);
  const normalizedNickname = volunteer.nickname ? cleanText(volunteer.nickname) : '';

  // Check if query exists inside the clean name or clean nickname
  return (
    normalizedName.includes(normalizedQuery) ||
    normalizedNickname.includes(normalizedQuery)
  );
}
