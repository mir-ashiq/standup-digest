# Standup Digest — demo video script (target: 1:45, hard cap 5:00)

Record from the judge-account site with a board that has an active sprint
(8–12 issues, mixed states, at least one Blocked).

| Time | Section | Screen | Narration (say this) |
|---|---|---|---|
| 0:00 | Hook | Digest page with a populated digest | "Standup meetings die when nobody knows what moved. This is Standup Digest — the sixty-second standup, generated from Jira." |
| 0:15 | The digest | Scroll through per-person rows | "For every person on the board: what moved since yesterday, what's next, and what's blocked. One line each — the meeting's agenda, written by the data." |
| 0:40 | Blockers | Point at the blocked row / lozenge | "Blockers are flagged and counted, so the standup starts at the interesting part instead of ending there." |
| 0:55 | The agent | Rovo chat: "Give me today's standup digest" | "It's also a Rovo agent. Same engine, same answer — and it reads the tool output verbatim, so it never invents an issue key." |
| 1:20 | How it's built | README architecture | "A pure, unit-tested digest engine behind two read-only Jira scopes. Installs in minutes; nothing it does can modify your Jira." |
| 1:40 | Close | Digest page | "Standup Digest: read the meeting before you have it. Built on Forge, Jira, and Rovo." |

Rules mapping: real site install visible; agent surface shown; keep it
short — this app's pitch IS its simplicity.
