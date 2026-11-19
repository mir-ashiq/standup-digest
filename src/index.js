/**
 * Standup Digest — Forge entry point (resolver + 2 actions + scheduled).
 */
import Resolver from '@forge/resolver';
import kvs from '@forge/kvs';
import { getAllBoards, getBoardIssues } from './backend/jira-client';
import { buildDigest, renderDigest } from './backend/digest-engine';
import { seedDemoData } from './backend/demo-seeder';

// ---------------------------------------------------------------------------
// Resolver (frontend bridge)
// ---------------------------------------------------------------------------
const resolver = new Resolver();

resolver.define('getBoards', async () => ({ boards: await getAllBoards() }));

// Empty-site rescue: one click builds the SDD demo project so the digest
// has people, movement and blockers to show a judge on a fresh site.
resolver.define('seedDemo', async () => seedDemoData());

resolver.define('getDigest', async ({ payload }) => {
  const boardId = String(payload.boardId || '');
  if (!boardId) return { error: 'No board specified.' };
  const sinceHours = Number(payload.sinceHours) || 24;
  const issues = await getBoardIssues(boardId);
  if (!issues.length) return { error: 'No issues found on this board (or no active sprint).' };
  const digest = buildDigest(issues, Date.now(), sinceHours);
  // Cache the last digest per board so the page renders instantly on reopen.
  try { await kvs.set(`digest:${boardId}`, { at: digest.generatedAt, sinceHours, digest }); } catch {}
  return { digest, text: renderDigest(digest) };
});

export const handler = resolver.getDefinitions();

// ---------------------------------------------------------------------------
// Rovo agent / MCP actions
// ---------------------------------------------------------------------------
function boardIdFromContextOrInput(payload) {
  return payload?.boardId || payload?.context?.board?.id || null;
}

export async function actGetStandupDigest(payload) {
  const boardId = boardIdFromContextOrInput(payload);
  if (!boardId) return 'No board specified. Ask the user which board, or open Standup Digest first.';
  const issues = await getBoardIssues(String(boardId));
  if (!issues.length) return 'No issues found on this board.';
  const digest = buildDigest(issues);
  return renderDigest(digest);
}

export async function actGetBlockers(payload) {
  const boardId = boardIdFromContextOrInput(payload);
  if (!boardId) return 'No board specified.';
  const issues = await getBoardIssues(String(boardId));
  const blockers = issues.filter((i) => /block/i.test(i.status));
  if (!blockers.length) return 'No blocked issues on this board. 🎉';
  return blockers.map((b) => `${b.key}: ${b.summary} (${b.assignee})`).join('\n');
}

// ---------------------------------------------------------------------------
// Scheduled trigger: keep KVS fresh for instant panel loads (cheap scan)
// ---------------------------------------------------------------------------
/**
 * Hourly: refresh the cached digest for up to 3 boards so the page loads
 * instantly (and the agent has a fresh answer) without a live fetch.
 */
export async function dailyDigest() {
  try {
    const boards = await getAllBoards();
    for (const board of boards.slice(0, 3)) {
      const issues = await getBoardIssues(String(board.id));
      if (!issues.length) continue;
      const digest = buildDigest(issues);
      try { await kvs.set(`digest:${board.id}`, { at: digest.generatedAt, digest }); } catch {}
    }
  } catch (e) {
    console.error('dailyDigest failed', String(e));
  }
}
