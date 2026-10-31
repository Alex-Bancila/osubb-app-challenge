import type { Volunteer } from './types';

/** Lower case, no diacritics, no spaces at the ends: "  Ștefan " becomes "stefan". */
function normalizeText(text: string): string {
  return text
    .normalize('NFD') // "ș" becomes "s" plus a separate combining mark
    .replace(/\p{M}/gu, '') // drop the combining marks
    .toLowerCase()
    .trim();
}

/**
 * Whether the search text finds this volunteer: it appears in their name or
 * in their nickname, ignoring upper/lower case and diacritics, so "stefan"
 * finds "Ștefan". An empty search finds everyone.
 */
export function matchesVolunteer(volunteer: Volunteer, query: string): boolean {
  const needle = normalizeText(query);
  if (needle === '') return true;
  const fields = [volunteer.name, volunteer.nickname ?? ''];
  return fields.some((field) => normalizeText(field).includes(needle));
}
