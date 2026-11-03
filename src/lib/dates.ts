const MS_PER_DAY = 24 * 60 * 60 * 1000;

function parseDay(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatDate(iso: string): string {
  const date = parseDay(iso);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}.${date.getFullYear()}`;
}

export function daysUntil(iso: string, today: Date): number {
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const target = parseDay(iso);
  return Math.round((target.getTime() - start.getTime()) / MS_PER_DAY);
}
