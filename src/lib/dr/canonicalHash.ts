import CryptoJS from 'crypto-js';

export const KM_AUTH_HASH_V1 = 'KM-AUTH-HASH-V1';

/**
 * Recursive canonical JSON stringifier (RFC 8785 style)
 * - Alphabetically sorted object keys at all nesting levels
 * - No whitespace, compact representation
 * - Normalizes strings to UTF-8 NFC
 * - Number formatting without exponent drift
 */
export function canonicalStringify(obj: any): string {
  if (obj === null || obj === undefined) {
    return 'null';
  }

  if (typeof obj === 'boolean') {
    return obj ? 'true' : 'false';
  }

  if (typeof obj === 'number') {
    if (!Number.isFinite(obj)) return 'null';
    return Number.isInteger(obj) ? obj.toString() : parseFloat(obj.toFixed(6)).toString();
  }

  if (typeof obj === 'string') {
    return JSON.stringify(obj.normalize('NFC'));
  }

  if (Array.isArray(obj)) {
    const serializedItems = obj.map((item) => canonicalStringify(item));
    return `[${serializedItems.join(',')}]`;
  }

  if (typeof obj === 'object') {
    const keys = Object.keys(obj).sort();
    const keyPairs = keys.map((key) => {
      const k = JSON.stringify(key.normalize('NFC'));
      const v = canonicalStringify(obj[key]);
      return `${k}:${v}`;
    });
    return `{${keyPairs.join(',')}}`;
  }

  return JSON.stringify(obj);
}

/**
 * SHA-256 hash of canonicalized JSON
 */
export function sha256Canonical(obj: any): string {
  const canonicalStr = canonicalStringify(obj);
  return CryptoJS.SHA256(canonicalStr).toString(CryptoJS.enc.Hex);
}

/**
 * Re-hashes raw PostgreSQL text or JSON payload string deterministically
 */
export function rehashRuntimeState(runtimeStateText: string): string {
  try {
    const parsed = JSON.parse(runtimeStateText);
    return sha256Canonical(parsed);
  } catch {
    // Fallback for sanitized row text
    const sanitized = runtimeStateText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.startsWith('--'))
      .sort()
      .join('\n');
    return CryptoJS.SHA256(sanitized).toString(CryptoJS.enc.Hex);
  }
}

/**
 * Verification test assertion for remediation run sample payload
 * Payload: {"identity_id":"id","capability_id":"cap","scope":"s","request_nonce":"n"}
 * Expected Hash: 517c116cebb201101113ec99ca135ba8dd506d9a1d90ec57ef3705984113a338
 */
export function verifyCanonicalHashSample(): { samplePayload: any; canonicalStr: string; hash: string; matchesExpected: boolean } {
  const samplePayload = {
    identity_id: 'id',
    capability_id: 'cap',
    scope: 's',
    request_nonce: 'n',
  };

  const canonicalStr = canonicalStringify(samplePayload);
  const hash = sha256Canonical(samplePayload);
  const expectedHash = '517c116cebb201101113ec99ca135ba8dd506d9a1d90ec57ef3705984113a338';

  return {
    samplePayload,
    canonicalStr,
    hash,
    matchesExpected: hash === expectedHash,
  };
}
