import { describe, it, expect } from 'vitest';
import { isOpen, lastTouched, buildDigest, renderDigest } from '../src/backend/digest-engine';

const NOW = new Date('2026-11-17T09:00:00Z').getTime();
const H = 3600_000;
const iso = (t) => new Date(t).toISOString();

function issue(key, over = {}) {
  return {
    key,
    summary: `Summary ${key}`,
    status: 'In Progress',
    assignee: 'Ada',
    updated: iso(NOW - 2 * H),
    created: iso(NOW - 10 * 24 * H),
    ...over,
  };
}

describe('isOpen', () => {
  it('treats done/closed/resolved/cancelled as not open', () => {
    expect(isOpen({ status: 'Done' })).toBe(false);
    expect(isOpen({ status: 'In Progress' })).toBe(true);
    expect(isOpen({ statusCategory: 'done' })).toBe(false);
    expect(isOpen({ statusCategory: 'new' })).toBe(true);
  });
});

describe('lastTouched', () => {
  it('picks the later of updated/created', () => {
    const t = lastTouched(issue('X', { updated: iso(NOW - H), created: iso(NOW - 100 * H) }));
    expect(t.getTime()).toBe(NOW - H);
  });
  it('returns null with no timestamps', () => {
    expect(lastTouched({ key: 'X' })).toBeNull();
  });
});

describe('buildDigest', () => {
  it('buckets moved / next / blocked per person', () => {
    const issues = [
      issue('A1', { assignee: 'Ada', updated: iso(NOW - 1 * H) }),            // moved
      issue('A2', { assignee: 'Ada', updated: iso(NOW - 72 * H) }),           // next
      issue('A3', { assignee: 'Ada', status: 'Blocked' }),                    // blocked
      issue('G1', { assignee: 'Grace', updated: iso(NOW - 2 * H) }),          // moved
      issue('U1', { assignee: 'Unassigned' }),                                // next
      issue('D1', { assignee: 'Ada', status: 'Done', updated: iso(NOW - 1 * H) }), // moved (closed news)
    ];
    const d = buildDigest(issues, NOW);
    expect(d.personCount).toBe(3);
    expect(d.issueCount).toBe(6);
    expect(d.blockedCount).toBe(1);
    const ada = d.people.find((p) => p.name === 'Ada');
    expect(ada.moved.sort()).toEqual(['A1', 'D1']);
    expect(ada.next).toEqual(['A2']);
    expect(ada.blocked).toEqual(['A3']);
    const grace = d.people.find((p) => p.name === 'Grace');
    expect(grace.moved).toEqual(['G1']);
  });

  it('sorts people by name', () => {
    const issues = [issue('Z', { assignee: 'Zoe' }), issue('B', { assignee: 'Bob' })];
    const d = buildDigest(issues, NOW);
    expect(d.people.map((p) => p.name)).toEqual(['Bob', 'Zoe']);
  });

  it('handles unassigned work', () => {
    const d = buildDigest([issue('U1', { assignee: null })], NOW);
    expect(d.people[0].name).toBe('Unassigned');
  });
});

describe('renderDigest', () => {
  it('renders one line per person with sections', () => {
    const d = buildDigest(
      [issue('A1'), issue('A2', { updated: iso(NOW - 72 * H) })],
      NOW
    );
    const text = renderDigest(d);
    expect(text).toContain('Standup digest — 2026-11-17');
    expect(text).toContain('Ada — moved: A1 | next: A2');
    expect(text).not.toContain('BLOCKED');
  });
  it('flags blocked items', () => {
    const d = buildDigest([issue('A3', { status: 'Blocked' })], NOW);
    expect(renderDigest(d)).toContain('BLOCKED: A3');
    expect(renderDigest(d)).toContain('1 blocked item(s)');
  });
  it('treats unresolved blocking links as blocked (no Blocked status needed)', () => {
    const d = buildDigest([issue('A4', { blockingLinks: [{ key: 'A3', resolved: false }] })], NOW);
    expect(d.blockedCount).toBe(1);
    expect(renderDigest(d)).toContain('BLOCKED: A4');
  });
  it('ignores resolved blocking links', () => {
    const d = buildDigest([issue('A5', { blockingLinks: [{ key: 'A3', resolved: true }] })], NOW);
    expect(d.blockedCount).toBe(0);
  });
  it('respects a custom since-hours window', () => {
    const d = buildDigest([issue('A6', { updated: iso(NOW - 30 * H) })], NOW, 48);
    const ada = d.people.find((p) => p.name === 'Ada');
    expect(ada.moved).toEqual(['A6']);
  });
});
