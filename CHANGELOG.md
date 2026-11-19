# Changelog

## 1.1.0 — 2026-11-19 (loss-register fixes)
- Added: rovo:mcp server exposing both tools (the submission claimed MCP
  exposure; the manifest now actually declares it).
- Fixed: demo blockers are real "Blocks" issue links — fresh Scrum projects
  have no Blocked status, so the old status-only demo silently showed zero
  blockers.
- Fixed: digest engine detects blocking links, not just status names.
- Fixed: scheduled trigger now actually caches digests to KVS (the old
  comment claimed it; the code did not).
- UI: since-hours window selector (24/48/72h), issue-key deep links,
  copy-digest-text button.
- Agent: followUpPrompt no longer promises Confluence posting (which the
  app cannot do) — it offers actions that exist.
- CI: GitHub Actions (tests with coverage + manifest parse).
- Docs: architecture diagram, judge quick path on top, CHANGELOG.

## 1.0.0 — 2026-11-16
- Initial release: digest page, Rovo agent with 2 actions, hourly refresh,
  demo seeder, 8 unit tests.
