import type { Volunteer } from './types';

/**
 * Whether the search text finds this volunteer: it appears in their name or
 * in their nickname, ignoring upper/lower case and diacritics, so "stefan"
 * finds "Ștefan". An empty search finds everyone.
 *
 * Not built yet: see TASKS.md, task B5.
 */
function fold(text: string): string {
  return text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
}

export function matchesVolunteer(volunteer: Volunteer, query: string): boolean {
  const needle = fold(query.trim());
  if (needle === '') return true;
  if (fold(volunteer.name).includes(needle)) return true;
  if (volunteer.nickname !== null && fold(volunteer.nickname).includes(needle)) return true;
  return false;
}