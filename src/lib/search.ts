import type { Volunteer } from './types';


/** 
 * Normalize text by making all text lower case
 * eliminate diacritics ( and what remain out of them throgh replace )
*/
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '');
}
/**
 * Whether the search text finds this volunteer: it appears in their name or
 * in their nickname, ignoring upper/lower case and diacritics, so "stefan"
 * finds "Ștefan". An empty search finds everyone.
 *
 * Not built yet: see TASKS.md, task B5.
 */
export function matchesVolunteer(volunteer: Volunteer, query: string): boolean {
  const search = normalize(query.trim());

  if (search === '') return true;

  const name = normalize(volunteer.name);
  const nickname = normalize(volunteer.nickname ?? '');

  return name.includes(search) || nickname.includes(search);
}
