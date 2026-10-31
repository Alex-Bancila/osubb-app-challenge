const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Reads an ISO date (YYYY-MM-DD) as a local calendar day. */
function parseDay(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/** Formats an ISO date (YYYY-MM-DD) the Romanian way: DD.MM.YYYY. */
export function formatDate(iso: string): string {
  const date = parseDay(iso);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}.${date.getFullYear()}`;
}

/**
 * Whole days from `today` to the ISO date: 0 on the day itself, negative once
 * it has passed.
 */
export function daysUntil(iso: string, today: Date): number {
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((parseDay(iso).getTime() - start.getTime()) / MS_PER_DAY);
}
