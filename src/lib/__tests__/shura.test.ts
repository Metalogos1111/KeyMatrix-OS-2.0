import { describe, it, expect } from 'vitest';
import {
  checkAuthority,
  SHURA_RULE_42,
  INITIAL_SHURA_COUNCIL,
  ShuraSigner,
} from '../authority/shuraRules';

describe('M03 Authority Layer - Shura Rule #42 Governance Tests', () => {
  it('blocks high-impact actions (>1000 people) when submitted by non-Shura role', () => {
    const result = checkAuthority('Adult', {
      peopleAffected: 1500,
      co2Tons: 10,
      nurAmount: 100,
    });

    expect(result.passed).toBe(false);
    expect(result.violatesRule42).toBe(true);
    expect(result.requiresShuraCouncil).toBe(true);
    expect(result.ruleCode).toBe('SHURA_RULE_42_VIOLATION');
  });

  it('blocks high-impact actions (>500t CO2) when submitted by Engineer role', () => {
    const result = checkAuthority('Engineer', {
      peopleAffected: 50,
      co2Tons: 750,
      nurAmount: 200,
    });

    expect(result.passed).toBe(false);
    expect(result.violatesRule42).toBe(true);
    expect(result.requiresShuraCouncil).toBe(true);
  });

  it('blocks Shura role action if quorum (<3 signatures) is not met', () => {
    // Council members with only 2 signatures
    const partialSigners: ShuraSigner[] = INITIAL_SHURA_COUNCIL.map((s, idx) => ({
      ...s,
      signed: idx < 2, // only 2 signed
    }));

    const result = checkAuthority('Shura', {
      peopleAffected: 2500,
      co2Tons: 1200,
      nurAmount: 50000,
      signers: partialSigners,
    });

    expect(result.passed).toBe(false);
    expect(result.violatesRule42).toBe(true);
    expect(result.shuraQuorumMet).toBe(false);
    expect(result.activeSignersCount).toBe(2);
    expect(result.requiredSignatures).toBe(3);
    expect(result.ruleCode).toBe('SHURA_RULE_42_QUORUM_PENDING');
  });

  it('approves high-impact action when role is Shura and 3-of-5 quorum signatures are present', () => {
    // Council members with 3 signatures
    const validQuorumSigners: ShuraSigner[] = INITIAL_SHURA_COUNCIL.map((s, idx) => ({
      ...s,
      signed: idx < 3, // 3 members signed
    }));

    const result = checkAuthority('Shura', {
      peopleAffected: 5000,
      co2Tons: 2000,
      nurAmount: 100000,
      signers: validQuorumSigners,
    });

    expect(result.passed).toBe(true);
    expect(result.violatesRule42).toBe(false);
    expect(result.shuraQuorumMet).toBe(true);
    expect(result.activeSignersCount).toBe(3);
    expect(result.ruleCode).toBe('SHURA_RULE_42_APPROVED');
  });

  it('permits low-impact everyday actions for Adult role within regular thresholds', () => {
    const result = checkAuthority('Adult', {
      peopleAffected: 25,
      co2Tons: 5,
      nurAmount: 50,
    });

    expect(result.passed).toBe(true);
    expect(result.violatesRule42).toBe(false);
    expect(result.requiresShuraCouncil).toBe(false);
    expect(result.ruleCode).toBe('AUTHORITY_PASSED');
  });
});
