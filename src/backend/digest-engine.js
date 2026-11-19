/**
 * Standup Digest — pure digest engine.
 * No I/O: takes fetched issues + a "now" timestamp, produces the per-person
 * digest. Fully unit-tested.
 */

/** @returns {boolean} true if the issue is not in a done category */
export function isOpen(issue) {
  const done = ['done', 'closed', 'resolved', 'cancelled'];
  return !done.includes(String(issue.statusCategory || issue.status || '').toLowerCase());
}

/** @returns {Date|null} latest of updated/created */
export function lastTouched(issue) {
  const candidates = [issue.updated, issue.created].filter(Boolean).map((t) => new Date(t));
  if (!candidates.length) return null;
  return candidates.reduce((a, b) => (a > b ? a : b));
}

/**
 * Split a board's issues into per-person buckets.
 * moved:   updated within `sinceHours` (default 24)
 * next:    open, assigned, not yet moved in that window
 * blocked: status contains "block" (case-insensitive)
 */
export function buildDigest(issues, now = Date.now(), sinceHours = 24) {
  const cutoff = now - sinceHours * 3600_000;
  const people = new Map();

  const bucket = (name) => {
    if (!people.has(name)) {
      people.set(name, { name, moved: [], next: [], blocked: [] });
    }
    return people.get(name);
  };

  for (const issue of issues) {
    const assignee = issue.assignee || 'Unassigned';
    const touched = lastTouched(issue) ? lastTouched(issue).getTime() : 0;
    const movedRecently = touched >= cutoff;
    const isBlocked =
      /block/i.test(String(issue.status || '')) ||
      (Array.isArray(issue.blockingLinks) && issue.blockingLinks.some((l) => !l.resolved));

    if (isBlocked) bucket(assignee).blocked.push(issue.key);
    else if (movedRecently) bucket(assignee).moved.push(issue.key);
    else if (isOpen(issue)) bucket(assignee).next.push(issue.key);
    else bucket(assignee).moved.push(issue.key); // closed items grouped as news
  }

  const peopleArr = [...people.values()];
  return {
    generatedAt: new Date(now).toISOString(),
    personCount: peopleArr.length,
    issueCount: issues.length,
    blockedCount: peopleArr.reduce((n, p) => n + p.blocked.length, 0),
    people: peopleArr.sort((a, b) => a.name.localeCompare(b.name)),
  };
}

/** Render the digest to plain text (agent output, scheduled posts, UI preview) */
export function renderDigest(digest) {
  const lines = [`Standup digest — ${digest.generatedAt.slice(0, 10)}`];
  for (const p of digest.people) {
    const parts = [];
    if (p.moved.length) parts.push(`moved: ${p.moved.join(', ')}`);
    if (p.next.length) parts.push(`next: ${p.next.join(', ')}`);
    if (p.blocked.length) parts.push(`BLOCKED: ${p.blocked.join(', ')}`);
    lines.push(`${p.name} — ${parts.join(' | ')}`);
  }
  if (digest.blockedCount) lines.push(`(${digest.blockedCount} blocked item(s) — discuss at standup)`);
  return lines.join('\n');
}
