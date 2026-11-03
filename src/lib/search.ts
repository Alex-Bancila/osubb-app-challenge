import type { Volunteer } from './types';

/**
 * Whether the search text finds this volunteer: it appears in their name or
 * in their nickname, ignoring upper/lower case and diacritics, so "stefan"
 * finds "Ștefan". An empty search finds everyone.
 *
 * Not built yet: see TASKS.md, task B5.
 */

function normalizeText(text:  string) : string{
  if ( !text ) return "";

  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g , "")
    .toLowerCase();

}


export function matchesVolunteer(volunteer: Volunteer, query: string): boolean {
  if(!query || query.trim() === ''){
    return true;
  }
  const cleanQuery = normalizeText(query);
  const cleanName = normalizeText(volunteer.name);
  const cleanNickname = normalizeText(volunteer.nickname || "") ;
  return cleanName.includes(cleanQuery) || cleanNickname.includes(cleanQuery);
  
}
