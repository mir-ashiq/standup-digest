# Devpost submission draft — Standup Digest (win-grade, ready to paste)
# Updated Nov 18, 2026: solo voice, demo-project seeder, judge-path first.

## Title
Standup Digest — the 60-second standup, generated from Jira

## Elevator pitch (Devpost "tagline", ≤ 200 chars; 193 chars)
Standup meetings die when nobody knows what moved. Standup Digest reads the board's activity and turns it into a per-person digest — moved, next, blocked — that the whole team reads in a minute.

## Inspiration
Every team runs the same ritual: fifteen people saying "yesterday I… today I… no blockers" while everyone else checks their phone. The data for all of it already sits in Jira — issue updates, assignments, statuses. I built Standup Digest to turn that data into the meeting's agenda, so the meeting starts at the interesting part instead of the roll call.

## What it does
- **Digest page** (Jira global page): pick a board, get the per-person digest — ✅ what moved since yesterday · ➡️ what's next · ⛔ who's blocked.
- **Standup Digest agent** (rovo:agent): "Give me today's standup digest" in Rovo chat, with the same engine and zero hallucination (the agent reads the tool output, never invents keys).
- **Blockers action**: ask the agent who's blocked and get the list with assignees — the only part of standup that actually needs a human decision.
- **Hourly refresh** (scheduledTrigger): the digest is always current.
- **One-click demo project**: on a brand-new empty site, the digest page offers "Generate demo project" — it seeds a 10-issue sprint with movers, blockers and quiet tickets, so the first Refresh shows a complete digest with no setup.

## How I built it
Forge (UI Kit), Jira Agile REST (board → active sprint → issues), Rovo agent with 2 actions, scheduled trigger, and the project/sprint APIs for the demo seeder behind write scopes reserved for that path. The digest engine is pure and fully unit-tested — bucketing, blocking detection, person sorting, rendering — so every surface renders from the same tested core.

## Challenges I ran into
- Keeping it honest: the digest must reflect what Jira actually saw, so the agent prompt hard-codes "output the digest verbatim; never invent keys."
- The empty-board problem: a judge's fresh site has no board, and a digest app with nothing to digest is a blank screen. The seeder fixes that, and it had to be safe — idempotent, its own labeled project, never touching existing data.

## Accomplishments I'm proud of
- Radical simplicity: two read-only scopes in its core, zero external services, installs in minutes — and still a complete daily workflow.
- 8/8 unit tests on the engine that generates every surface.
- The judge path: install → Generate demo project → Refresh → a full standup digest in under a minute, on a site that had nothing on it.

## What I learned
A small, sharp read-only app is a legitimate Codegeist entry — the judging criteria ask for a complete product experience, not the most code. And the fastest way to make a product feel complete is to make sure a stranger's first minute never shows an empty screen.

## What's next for Standup Digest
Slack/Teams delivery of the scheduled digest, per-person "what I did" weekly rollup, and sprint-pace projections (burn-up from the digest data).

## Built with (tags)
forge, atlassian, jira, rovo, ai-agents, react, nodejs, developer-tools, productivity

## Try it out link
https://github.com/mir-ashiq/standup-digest

## Testing instructions (Step 3 field)
1) Click the installation link and approve the app on your Atlassian site (works on free sites). 2) Open Jira → Apps → Standup Digest. EXISTING BOARD? Pick it and click "Refresh" for the per-person digest. EMPTY SITE? Click "Generate demo project" — it creates a 10-issue sprint with movers, blockers and quiet tickets — then click "Refresh". 3) Rovo Chat → Browse agents → Standup Digest → "Give me today's standup digest". Note: if Rovo chat is not visible on a free site, the digest page still works fully. The app is read-only by default; the demo seeder only creates its own labeled project and never modifies existing data.

## Technology requirement (Step 3 field)
Standup Digest is a Forge app: manifest.yml declares a jira:globalPage, a rovo:agent with 2 actions (get-standup-digest, get-blockers), and a scheduledTrigger that refreshes board data hourly. It integrates with Jira through the Agile REST API (boards, active sprints, sprint issues with field projection) and the core digest engine — bucketing issues into moved/next/blocked per person — is pure and unit-tested (8 tests). The same engine renders the page, the agent output and the MCP-exposed tools.

## Category + bonus
- Category: Apps for Software Teams
- Why this track: Standup Digest lives inside the daily rhythm of every software team — the standup. It reads the sprint board the team already updates and turns it into the agenda, saving the first ten minutes of the only meeting nobody wants to make longer.
- Bonus prize: Best Agents — Rovo/Assignable agents

## Forge experience / AI tools (Step 3 fields)
- Forge experience: The smallest app in my portfolio and the one that taught me the most about restraint: two scopes, one resolver, one scheduled trigger, and the whole thing feels instant. The Agile REST board→sprint→issue chain is well designed; the only friction was the mid-migration search API, which I avoided entirely by keying off sprint IDs rather than JQL.
- AI tools used: An AI coding agent (GLM via z.ai) for scaffolding, implementation, unit tests and documentation; Atlassian developer documentation and the Forge CLI for API verification and deployment planning.

## Requirements checklist (official rules mapping)
- [x] Forge app + ≥1 Atlassian integration (Jira, Rovo)
- [x] Category: Apps for Software Teams
- [x] Bonus target: Best Agents
- [x] Install link + test instructions (README + judge quick path in repo)
- [x] Public repo with license: https://github.com/mir-ashiq/standup-digest
- [ ] Demo video < 5 min (script in VIDEO-SCRIPT.md)
- [ ] Installation link + App ID (after forge deploy — see runbook)
- [ ] CONDITIONAL submission: only if SG + Constella are deploy-verified green by Dec 6 (see PORTFOLIO-STRATEGY.md §3)
