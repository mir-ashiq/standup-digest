/**
 * Standup Digest — demo data seeder.
 *
 * Same rationale as Sprint Guardian's: a judge on a brand-new empty site
 * would otherwise see "No issues found" and nothing else. This creates a
 * Scrum project (key SDD) with a 10-issue active sprint across 3 assignee
 * patterns (movers, blocked, quiet), so the digest has people, movement and
 * a blocker to show on the first Refresh.
 *
 * Idempotent and defensive: never deletes, returns {already:true} if the
 * SDD project exists, and {error} instead of throwing on any failure.
 */
import api, { route } from '@forge/api';

const PROJECT_KEY = 'SDD';

async function jpost(url, payload) {
  try {
    const res = await api.asApp().requestJira(route`${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch { data = null; }
    if (!res.ok) return { error: `Jira responded ${res.status}: ${(text || '').slice(0, 200)}` };
    return data || {};
  } catch (e) {
    return { error: String(e && e.message ? e.message : e) };
  }
}

async function jget(url) {
  try {
    const res = await api.asApp().requestJira(route`${url}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function adf(text) {
  return {
    type: 'doc',
    version: 1,
    content: text ? [{ type: 'paragraph', content: [{ type: 'text', text }] }] : [],
  };
}

let myId = null;
async function getMyAccountId() {
  if (myId) return myId;
  try {
    const res = await api.asApp().requestJira(route`/rest/api/3/myself`);
    if (!res.ok) return null;
    const me = await res.json();
    myId = me.accountId || null;
    return myId;
  } catch {
    return null;
  }
}

/**
 * 10 issues. Statuses fill the moved/next buckets; the blocked bucket is
 * driven by a REAL "Blocks" issue link (issue 4 is blocked by issue 3),
 * because fresh Scrum projects have no "Blocked" status — a status-only
 * demo silently degrades to zero blockers. The link is what
 * get-blockers and the digest's blocked bucket actually detect.
 */
function demoIssues() {
  return [
    { summary: 'Wire up login form', status: 'Done', desc: 'OAuth flow implemented; awaiting review.' },
    { summary: 'Fix date picker on Safari', status: 'In Progress', desc: 'Focus event swallowed by the polyfill.' },
    { summary: 'Export report to CSV', status: 'In Progress', desc: 'Streaming export to avoid memory spikes.' },
    { summary: 'SSO vendor reply needed for login fix', status: 'In Progress', desc: 'Vendor ticket #4412, escalated Monday. Blocks the Safari fix below.' },
    { summary: 'Fix date picker on Safari (blocked variant)', status: 'To Do', desc: 'Waiting on the SSO vendor reply above.', blockedBy: 'SSO vendor reply needed for login fix' },
    { summary: 'Design empty states', status: 'To Do', desc: 'Three screens need empty-state illustrations.', unassigned: true },
    { summary: 'Write onboarding doc', status: 'To Do', desc: '', unassigned: true },
    { summary: 'Upgrade Node runtime', status: 'Done', desc: 'Runtime bumped; smoke tests green.' },
    { summary: 'Investigate flaky checkout test', status: 'In Progress', desc: 'Fails ~20% on CI; suspect ordering.' },
    { summary: 'Customer feedback triage', status: 'To Do', desc: "Review last week's tickets from the support inbox." },
  ];
}

export async function seedDemoData() {
  const existing = await jget(`/rest/api/3/project/${PROJECT_KEY}`);
  if (existing && existing.id) return { already: true, projectKey: PROJECT_KEY };

  const me = await getMyAccountId();
  const project = await jpost('/rest/api/3/project', {
    key: PROJECT_KEY,
    name: 'Standup Digest Demo',
    projectTypeKey: 'software',
    projectTemplateKey: 'com.pyxis.greenhopper.jira:gh-scrum-template',
    description: 'Seeded demo data for the Standup Digest app. Safe to delete.',
    leadAccountId: me,
    assigneeType: 'UNASSIGNED',
  });
  if (project.error) return project;

  const created = [];
  const bySummary = {};
  for (const spec of demoIssues()) {
    const fields = {
      project: { id: project.id },
      summary: spec.summary,
      issuetype: { name: 'Task' },
      description: adf(spec.desc),
      labels: ['sd-demo'],
    };
    // Leave "Design empty states" and "Write onboarding doc" unassigned so
    // the digest shows an Unassigned bucket too (a standup reality).
    if (me && !spec.unassigned) fields.assignee = { id: me };
    const issue = await jpost('/rest/api/3/issue', fields);
    if (!issue.error && issue.key) {
      created.push(issue.key);
      bySummary[spec.summary] = issue.key;
      if (spec.blockedBy && bySummary[spec.blockedBy]) {
        await jpost('/rest/api/3/issueLink', {
          type: { name: 'Blocks' },
          inwardIssue: { key: issue.key },
          outwardIssue: { key: bySummary[spec.blockedBy] },
        });
      }
      // Move to the intended status via transitions.
      if (spec.status !== 'To Do') {
        const transitions = await jget(`/rest/api/3/issue/${issue.key}/transitions`);
        const t = (transitions?.transitions || []).find((x) =>
          x.name.toLowerCase() === spec.status.toLowerCase() ||
          x.to?.name?.toLowerCase() === spec.status.toLowerCase()
        );
        if (t) await jpost(`/rest/api/3/issue/${issue.key}/transitions`, { transition: { id: t.id } });
      }
    }
  }

  const boards = await jget(`/rest/agile/1.0/board?projectKeyOrId=${project.id}`);
  const boardId = boards?.values?.[0]?.id ?? null;
  let sprintName = null;
  if (boardId) {
    const sprint = await jpost(`/rest/agile/1.0/sprint`, {
      name: 'Demo Sprint — standup fodder',
      originBoardId: boardId,
    });
    if (!sprint.error && sprint.id) {
      if (created.length) {
        await jpost(`/rest/agile/1.0/sprint/${sprint.id}/issue`, { issues: created });
      }
      const started = await jpost(`/rest/agile/1.0/sprint/${sprint.id}`, { state: 'active' });
      sprintName = started.error ? null : sprint.name;
    }
  }

  return { created: true, projectKey: PROJECT_KEY, boardId, sprintName, issueCount: created.length };
}
