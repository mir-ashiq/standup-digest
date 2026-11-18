/**
 * Standup Digest — UI Kit frontend.
 * jira:globalPage → board picker + today's digest, rendered per person.
 */
import React, { useEffect, useState } from 'react';
import ForgeReconciler, {
  Text, Heading, Stack, Inline, Button, Lozenge, SectionMessage, Spinner,
} from '@forge/react';
import { invoke } from '@forge/bridge';

function PersonRow({ person }) {
  return (
    <Stack space="space.050" xcss={{ backgroundColor: 'elevation.surface.sunken', padding: 'space.150', borderRadius: '3px' }}>
      <Inline space="space.100" blockAlign="center" grow="fill">
        <Text weight="semibold">{person.name}</Text>
        {person.blocked.length > 0 && <Lozenge appearance="removed">blocked</Lozenge>}
      </Inline>
      {person.moved.length > 0 && <Text size="small" as="p">✅ moved: {person.moved.join(', ')}</Text>}
      {person.next.length > 0 && <Text size="small" as="p">➡️ next: {person.next.join(', ')}</Text>}
      {person.blocked.length > 0 && <Text size="small" as="p">⛔ blocked: {person.blocked.join(', ')}</Text>}
    </Stack>
  );
}

function DigestView() {
  const [boards, setBoards] = useState([]);
  const [boardId, setBoardId] = useState(null);
  const [state, setState] = useState(null);
  const [busy, setBusy] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState(null);

  const loadBoards = () => {
    invoke('getBoards').then((r) => {
      setBoards(r.boards || []);
      if (r.boards?.length) setBoardId(String(r.boards[0].id));
    });
  };
  useEffect(loadBoards, []);
  useEffect(() => {
    if (boardId) invoke('getDigest', { boardId }).then(setState);
  }, [boardId]);

  const seedDemo = async () => {
    setSeeding(true); setSeedMsg(null);
    try {
      const r = await invoke('seedDemo');
      if (r.error) setSeedMsg(`Seeding failed: ${r.error}`);
      else if (r.already) setSeedMsg('Demo project already exists — pick the “Standup Digest Demo” board above.');
      else {
        setSeedMsg(`Created ${r.issueCount} demo issues in project ${r.projectKey}. Loading the new board…`);
        setBoardId(null);
        loadBoards();
        setTimeout(loadBoards, 4000);
      }
    } finally {
      setSeeding(false);
    }
  };

  const refresh = async () => {
    setBusy(true);
    setState(await invoke('getDigest', { boardId }));
    setBusy(false);
  };

  const d = state?.digest;
  return (
    <Stack space="space.200">
      <Inline space="space.200" blockAlign="center" grow="fill">
        <Heading as="h2">☀️ Standup Digest</Heading>
        {boardId && <Button appearance="primary" isDisabled={busy} onClick={refresh}>{busy ? 'Building…' : 'Refresh'}</Button>}
      </Inline>
      <Inline space="space.100" wrap="wrap">
        {boards.map((b) => (
          <Button key={b.id} appearance={String(b.id) === boardId ? 'primary' : 'default'} spacing="compact" onClick={() => setBoardId(String(b.id))}>{b.name}</Button>
        ))}
      </Inline>
      {!state && <Spinner label="Loading digest…" />}
      {boards.length === 0 && (
        <SectionMessage appearance="warning" title="No boards on this site yet">
          <Text as="p">
            This looks like a fresh site. Generate a demo project (10-issue sprint with movers, blockers and quiet tickets) and build a digest from it in one click.
          </Text>
          <Button appearance="primary" isDisabled={seeding} onClick={seedDemo}>
            {seeding ? 'Seeding demo data…' : 'Generate demo project'}
          </Button>
          {seedMsg && <Text as="p" size="small">{seedMsg}</Text>}
        </SectionMessage>
      )}
      {state?.error && boards.length > 0 && (
        <SectionMessage appearance="warning" title="Digest unavailable">
          <Text as="p">{state.error}</Text>
          <Button appearance="default" spacing="compact" isDisabled={seeding} onClick={seedDemo}>
            {seeding ? 'Seeding demo data…' : 'Or generate a demo project'}
          </Button>
        </SectionMessage>
      )}
      {d && (
        <Stack space="space.100">
          <Inline space="space.150" blockAlign="center">
            <Text>{d.personCount} people · {d.issueCount} issues</Text>
            {d.blockedCount > 0 && <Lozenge appearance="removed">{d.blockedCount} blocked</Lozenge>}
          </Inline>
          {d.people.map((p) => <PersonRow key={p.name} person={p} />)}
          <SectionMessage appearance="information" title="Talk to the agent">
            <Text as="p">In Rovo chat, ask the Standup Digest agent: “Give me today's standup digest” — it uses the same engine and can be added to any of your Rovo agents via MCP-style tools.</Text>
          </SectionMessage>
        </Stack>
      )}
    </Stack>
  );
}

ForgeReconciler.render(<React.StrictMode><DigestView /></React.StrictMode>);
