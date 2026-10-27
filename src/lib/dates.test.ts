import { daysUntil, formatDate } from './dates';

describe('formatDate', () => {
  it('writes the day, the month and the year as DD.MM.YYYY', () => {
    expect(formatDate('2026-10-05')).toBe('05.10.2026');
  });

  it('writes January as 01', () => {
    expect(formatDate('2026-01-31')).toBe('31.01.2026');
  });

  it('writes December as 12', () => {
    expect(formatDate('2026-12-24')).toBe('24.12.2026');
  });
});

describe('daysUntil', () => {
  const today = new Date(2026, 9, 20); // 20 October 2026

  it('is 0 on the day itself', () => {
    expect(daysUntil('2026-10-20', today)).toBe(0);
  });

  it('counts the days still left', () => {
    expect(daysUntil('2026-10-27', today)).toBe(7);
  });

  it('is negative once the day has passed', () => {
    expect(daysUntil('2026-10-18', today)).toBe(-2);
  });
});
