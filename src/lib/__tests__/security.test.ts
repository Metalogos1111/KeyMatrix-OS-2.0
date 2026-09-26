import { describe, it, expect, beforeEach } from 'vitest';
import {
  auditStorageSecurity,
  generateDidKey,
  resolveDidDocument,
  issueRoleCredential,
  signPayloadWithDid,
  verifyDidSignature,
} from '../identity/did';

describe('Security Hardening & TEE Enclave (v0.3 Civilization)', () => {
  beforeEach(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  it('should pass storage security audit when no private keys leak in localStorage', () => {
    const audit = auditStorageSecurity();
    expect(audit.pass).toBe(true);
    expect(audit.zeroLocalStorageLeak).toBe(true);
    expect(audit.indexedDbEncrypted).toBe(true);
  });

  it('should detect and scrub any accidental private key in localStorage', () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('temp_private_key', '0xabcdef123456');
      const audit = auditStorageSecurity();
      expect(audit.pass).toBe(false);
      expect(audit.purgedKeysCount).toBeGreaterThan(0);
      // Verify scrubbing
      expect(localStorage.getItem('temp_private_key')).toBeNull();
    }
  });

  it('should generate valid DID:key with ed25519-like multibase format', () => {
    const keyData = generateDidKey('OM_Brother_seed');
    expect(keyData.did).toContain('did:key:km_');
    expect(keyData.publicKey).toContain('z6Mku');

    const didDoc = resolveDidDocument(keyData.did);
    expect(didDoc.id).toBe(keyData.did);
    expect(didDoc.verificationMethod[0].publicKeyMultibase).toBeDefined();
  });

  it('should issue verifiable role credentials and support cryptographic signatures', () => {
    const cred = issueRoleCredential('did:key:km_test', 'Shura');
    expect(cred.credentialSubject.role).toBe('Shura');
    expect(cred.credentialSubject.shuraMember).toBe(true);

    const payload = JSON.stringify({ intent: 'Shura Council Consensus', co2: 600 });
    const signature = signPayloadWithDid('did:key:km_test', payload);
    expect(signature).toBeDefined();

    const isValid = verifyDidSignature('did:key:km_test', payload, signature);
    expect(isValid).toBe(true);
  });
});
