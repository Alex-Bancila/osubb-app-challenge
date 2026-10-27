import type { Volunteer } from './types';

/**
 * Whether the search text finds this volunteer: it appears in their name or
 * in their nickname, ignoring upper/lower case and diacritics, so "stefan"
 * finds "Ștefan". An empty search finds everyone.
 *
 * Not built yet: see TASKS.md, task B5.
 */
export function matchesVolunteer(volunteer: Volunteer, query: string): boolean {
  void volunteer;
  void query;
  return true;
}
