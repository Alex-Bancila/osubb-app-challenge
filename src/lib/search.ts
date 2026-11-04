import { VolunteerList } from '../components/VolunteerList';
import type { Volunteer } from './types';



/**
 * Whether the search text finds this volunteer: it appears in their name or
 * in their nickname, ignoring upper/lower case and diacritics, so "stefan"
 * finds "Ștefan". An empty search finds everyone.
 *
 * Not built yet: see TASKS.md, task B5.
 */
export function matchesVolunteer(volunteer: Volunteer, query: string): boolean {
  const wodiacritics = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const q = wodiacritics(query);
  const vName = wodiacritics(volunteer.name);
  const nickname = volunteer.nickname ? wodiacritics(volunteer.nickname) : "";
  if (query == '' || query.trim() == '') return true;
  if (vName.includes(q) || nickname.includes(q)) return true;
  if(vName.trim() && vName.includes(q)) return true;
  if(nickname.trim() && nickname.includes(q)) return true;
  return false;
}
