# Devpost submission draft (copy into the submission form fields)

## Title
Standup Digest — the 60-second standup, generated from Jira

## One-liner
Standup meetings die when nobody knows what moved. Standup Digest reads the
board's activity since yesterday and turns it into a per-person digest the
whole team reads in a minute.

## Inspiration
Every team runs the same ritual: fifteen people saying "yesterday I… today I…
no blockers" while everyone else checks their phone. The data for all of it
already sits in Jira — issue updates, assignments, statuses. Standup Digest
turns that data into the meeting's agenda, so the meeting starts at the
interesting part.

## What it does
- **Digest page** (Jira global page): pick a board, get the per-person digest
  — ✅ what moved since yesterday · ➡️ what's next · ⛔ who's blocked.
- **Standup Digest agent** (rovo:agent): "Give me today's standup digest" in
  Rovo chat, with the same engine and zero hallucination (the agent reads the
  tool output, never invents keys).
- **Hourly refresh** (scheduledTrigger): the digest is always current.

## How we built it
Forge (UI Kit), Jira Agile REST (board → active sprint → issues), Rovo agent
with 2 actions, scheduled trigger. The digest engine is pure and fully
unit-tested — bucketing, blocking detection, person sorting, rendering.

## Challenges we ran into
- Keeping it honest: the digest must reflect what Jira actually saw, so the
  agent prompt hard-codes "output the digest verbatim; never invent keys."

## Accomplishments we're proud of
- Radical simplicity: two read-only scopes, zero external services, installs
  in minutes — and still a complete daily workflow.
- 8/8 unit tests on the engine that generates every surface.

## What we learned
A small, sharp read-only app is a legitimate Codegeist entry — the judging
criteria ask for a complete product experience, not the most code.

## What's next for Standup Digest
Slack/Teams delivery of the scheduled digest, per-person "what I did" weekly
rollup, and sprint-pace projections (burn-up from the digest data).

## Built with
Forge, Jira REST (Agile), Rovo agent, React (UI Kit), Node.js

---

## Requirements checklist (official rules mapping)
- [x] Forge app + ≥1 Atlassian integration (Jira, Rovo)
- [x] Category: Apps for Software Teams
- [x] Bonus target: Best Marketplace published app (review-ticket link)
- [x] Install link + test instructions (README)
- [x] Public repo with license (Apache-2.0)
- [ ] Demo video < 5 min (script in VIDEO-SCRIPT.md)
- [ ] CONDITIONAL submission: only if SG + Constella are deploy-verified green by Dec 6 (see PORTFOLIO-STRATEGY.md §3)
