/**
 * KeyMatrix OS v2.1 — Phase 6.8.5 Local Engineering Workspace Vitest Suite
 * Comprehensive testing for WebContainer Local Browser Runtime, LocalExecutionProvider,
 * file CRUD operations, process streams, command safety, bounded repair loops,
 * evidence non-promotion, snapshots, and PoR finality null invariant.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { localExecutionProvider } from '../runtime/LocalExecutionProvider';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { getDefaultResonanceMetrics } from '../resonance';

describe('Phase 6.8.5 — Local Engineering Workspace (WebContainer)', () => {
  beforeEach(async () => {
    await localExecutionProvider.init('ws-test-phase6-8-5');
  });

  it('1. Initializes WebContainer Local Browser Runtime with correct metadata', async () => {
    const ws = localExecutionProvider.getWorkspace();
    expect(ws).not.toBeNull();
    expect(ws?.runtimeType).toBe('WEBCONTAINER');
    expect(ws?.persistenceMode).toBe('LOCAL_SESSION');
    expect(localExecutionProvider.availability).toBe('AVAILABLE_LOCAL');
    expect(localExecutionProvider.backendConnected).toBe(false);
    expect(localExecutionProvider.executionMode).toBe('LOCAL_WEBCONTAINER');
  });

  it('2. Creates Workspace model with required attributes', async () => {
    const ws = localExecutionProvider.getWorkspace();
    expect(ws?.workspaceId).toBe('ws-test-phase6-8-5');
    expect(ws?.identityContext.userName).toBe('OM_Brother');
    expect(ws?.filesHash).toMatch(/^hash_0x/);
  });

  it('3. Reads files from virtual filesystem', async () => {
    const appContent = await localExecutionProvider.readFile('src/App.tsx');
    expect(appContent).toContain('KeyMatrix OS Local Engineering Preview');
  });

  it('4. Writes file and updates virtual content', async () => {
    await localExecutionProvider.writeFile('src/test.txt', 'Hello KeyMatrix Local Workspace');
    const content = await localExecutionProvider.readFile('src/test.txt');
    expect(content).toBe('Hello KeyMatrix Local Workspace');
  });

  it('5. Creates new file in virtual directory', async () => {
    await localExecutionProvider.createFile('src/utils/math.ts', 'export const add = (a: number, b: number) => a + b;');
    const files = await localExecutionProvider.listFiles();
    expect(files.some((f) => f.path === 'src/utils/math.ts')).toBe(true);
  });

  it('6. Renames an existing file', async () => {
    await localExecutionProvider.createFile('src/oldName.ts', 'const x = 1;');
    await localExecutionProvider.renameFile('src/oldName.ts', 'src/newName.ts');
    const files = await localExecutionProvider.listFiles();
    expect(files.some((f) => f.path === 'src/oldName.ts')).toBe(false);
    expect(files.some((f) => f.path === 'src/newName.ts')).toBe(true);
  });

  it('7. Deletes a file from workspace', async () => {
    await localExecutionProvider.createFile('src/temp.ts', 'const temp = true;');
    await localExecutionProvider.deleteFile('src/temp.ts');
    const files = await localExecutionProvider.listFiles();
    expect(files.some((f) => f.path === 'src/temp.ts')).toBe(false);
  });

  it('8. Searches files by query string', async () => {
    const results = await localExecutionProvider.searchFiles('Qibla');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].path).toBeDefined();
  });

  it('9. Executes "npm run build" command cleanly in WebContainer', async () => {
    const res = await localExecutionProvider.executeCommand({
      id: 'req-build-test',
      command: 'npm run build',
    });
    expect(res.exitCode).toBe(0);
    expect(res.status).toBe('COMPLETED');
    expect(res.stdout).toContain('tsc && vite build');
  });

  it('10. Streams stdout events during process execution', async () => {
    const events: string[] = [];
    await localExecutionProvider.executeCommand(
      { id: 'req-stream-test', command: 'npm run build' },
      (evt) => {
        if (evt.type === 'STDOUT') events.push(evt.data);
      }
    );
    expect(events.length).toBeGreaterThan(0);
  });

  it('11. Captures stderr and exit code 1 on compilation failure', async () => {
    await localExecutionProvider.writeFile('src/broken.ts', 'SYNTAX_ERROR_FOR_TEST');
    const res = await localExecutionProvider.executeCommand({
      id: 'req-fail-test',
      command: 'npm run build',
    });
    expect(res.exitCode).toBe(1);
    expect(res.status).toBe('FAILED');
    expect(res.stderr).toContain('error TS2304');
  });

  it('12. Rejects unsafe or non-sandboxed system calls', async () => {
    const res = await localExecutionProvider.executeCommand({
      id: 'req-unsafe-test',
      command: 'sudo rm -rf /',
    });
    expect(res.exitCode).toBe(1);
    expect(res.status).toBe('FAILED');
    expect(res.stderr).toContain('[LOCAL_WEBCONTAINER_SAFETY]');
  });

  it('13. Detects dev server port 3000 opening on "npm run dev"', async () => {
    let portOpened = false;
    await localExecutionProvider.executeCommand(
      { id: 'req-dev-test', command: 'npm run dev' },
      (evt) => {
        if (evt.type === 'PORT_OPEN' && evt.port === 3000) {
          portOpened = true;
        }
      }
    );
    expect(portOpened).toBe(true);
    const status = localExecutionProvider.getPreviewStatus();
    expect(status.isListening).toBe(true);
    expect(status.port).toBe(3000);
  });

  it('14. Generates local evidence record capped strictly at OBSERVED level', async () => {
    const res = await localExecutionProvider.executeCommand({
      id: 'req-evidence-test',
      command: 'npm test',
    });
    expect(res.evidenceRef).toBeDefined();
    expect(res.evidenceLevel).toBe('OBSERVED');
    expect(res.evidenceLevel).not.toBe('VERIFIED');
    expect(res.evidenceLevel).not.toBe('PROVEN');
  });

  it('15. Creates workspace snapshot with Merkle SHA-256 hash', async () => {
    const snap = await localExecutionProvider.createSnapshot('Test Snapshot');
    expect(snap.snapshotId).toMatch(/^snap-/);
    expect(snap.filesHash).toMatch(/^hash_0x/);
    expect(snap.mode).toBe('LOCAL_WORKSPACE_SNAPSHOT');
  });

  it('16. Executes bounded build repair loop maxAttempts = 3', async () => {
    const store = useWorkspaceStore.getState();
    await store.initWorkspace();
    
    // Inject syntax error to force repair loop
    await localExecutionProvider.writeFile('src/App.tsx', 'SYNTAX_ERROR_FOR_TEST');

    await store.startBuildLoop('Fix build error', 'task-repair-01');

    const loopState = useWorkspaceStore.getState().buildLoop;
    expect(loopState?.phase).toBe('COMPLETE');
    expect(loopState?.currentAttempt).toBeLessThanOrEqual(3);
  });

  it('17. Cancels process execution via cancelExecution', async () => {
    await localExecutionProvider.cancelExecution('non-existent-proc');
    // Ensure no crash or uncaught throw
  });

  it('18. Stops dev server preview cleanly', async () => {
    await localExecutionProvider.stopPreview();
    const status = localExecutionProvider.getPreviewStatus();
    expect(status.isListening).toBe(false);
  });

  it('19. High-risk command safety approval modal resolution', async () => {
    const store = useWorkspaceStore.getState();
    
    // Mock user response
    setTimeout(() => {
      useWorkspaceStore.getState().respondToPermissionRequest('ALLOWED_ONCE');
    }, 50);

    const res = await store.executeTerminalCommand('npm run build');
    expect(res.status).toBe('COMPLETED');
  });

  it('20. Denies command execution on user refusal in safety modal', async () => {
    const store = useWorkspaceStore.getState();

    setTimeout(() => {
      useWorkspaceStore.getState().respondToPermissionRequest('DENIED');
    }, 50);

    const res = await store.executeTerminalCommand('npm run build');
    expect(res.status).toBe('FAILED');
    expect(res.stderr).toContain('Command execution denied');
  });

  it('21. INVARIANT CHECK: PoR finality remains strictly null', () => {
    const por = getDefaultResonanceMetrics();
    expect(por.finality).toBeNull();
    expect(por.finality).not.toBe('NULL');
  });
});
