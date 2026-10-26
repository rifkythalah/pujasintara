import test from 'node:test';
import assert from 'node:assert/strict';
import { todayOpeningHours } from '../src/lib/openingHours.js';

test('weekly schedule changes at midnight WIB, not UTC or device timezone', () => {
  assert.equal(todayOpeningHours(new Date('2026-10-23T16:59:59Z')), 'Buka hari ini pukul 08.00 – 19.00 WIB');
  assert.equal(todayOpeningHours(new Date('2026-10-23T17:00:00Z')), 'Buka hari ini pukul 09.00 – 16.00 WIB');
  assert.equal(todayOpeningHours(new Date('2026-10-25T16:59:59Z')), 'Buka hari ini pukul 09.00 – 16.00 WIB');
  assert.equal(todayOpeningHours(new Date('2026-10-25T17:00:00Z')), 'Buka hari ini pukul 08.00 – 19.00 WIB');
});

test('English uses the same approved WIB schedule', () => {
  assert.equal(todayOpeningHours(new Date('2026-10-23T00:00:00Z'), 'en'), 'Open today 08:00 – 19:00 WIB');
  assert.equal(todayOpeningHours(new Date('2026-10-24T00:00:00Z'), 'en'), 'Open today 09:00 – 16:00 WIB');
});
