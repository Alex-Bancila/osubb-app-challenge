import { Volunteer } from '../types';


export function matchesVolunteer(volunteer: Volunteer, query: string): boolean {
    // Dacă query-ul este gol sau conține doar spații, returnează true
    const normalizedQuery = query.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (!normalizedQuery) return true;

    // Funcție helper pentru eliminarea diacriticelor și transformarea în litere mici
    const cleanString = (str: string | undefined) => {
        if (!str) return "";
        return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const cleanName = cleanString(volunteer.name);
    const cleanNickname = cleanString(volunteer.nickname);

    // Verifică dacă query-ul se află în nume sau poreclă
    return cleanName.includes(normalizedQuery) || cleanNickname.includes(normalizedQuery);
}
