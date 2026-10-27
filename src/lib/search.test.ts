import { matchesVolunteer } from './search';
import type { Volunteer } from './types';

const stefan: Volunteer = {
  id: 1,
  name: 'Ștefan Pop',
  nickname: 'Ștefi',
  department: 'IT',
  role: 'Voluntar Activ',
};

const ioana: Volunteer = {
  id: 2,
  name: 'Ioana Mureșan',
  nickname: null,
  department: 'Educațional',
  role: 'Voluntar',
};

describe('matchesVolunteer', () => {
  it('finds everyone when the search is empty', () => {
    expect(matchesVolunteer(stefan, '')).toBe(true);
    expect(matchesVolunteer(ioana, '   ')).toBe(true);
  });

  it('finds a volunteer by part of their name', () => {
    expect(matchesVolunteer(ioana, 'Mureșan')).toBe(true);
  });

  it('finds a volunteer by their nickname', () => {
    expect(matchesVolunteer(stefan, 'Ștefi')).toBe(true);
  });

  it('ignores upper and lower case', () => {
    expect(matchesVolunteer(ioana, 'IOANA')).toBe(true);
  });

  it('ignores diacritics, so "stefan" finds "Ștefan"', () => {
    expect(matchesVolunteer(stefan, 'stefan')).toBe(true);
    expect(matchesVolunteer(ioana, 'muresan')).toBe(true);
  });

  it('finds nobody when the text is in neither the name nor the nickname', () => {
    expect(matchesVolunteer(stefan, 'Ioana')).toBe(false);
    expect(matchesVolunteer(ioana, 'xyz')).toBe(false);
  });

  it('does not break on a volunteer without a nickname', () => {
    expect(matchesVolunteer(ioana, 'null')).toBe(false);
  });
});
