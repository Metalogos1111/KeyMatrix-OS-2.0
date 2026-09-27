import { describe, it, expect } from 'vitest';
import { isSectionAllowedForRole, ROLE_CAPABILITIES } from '../authority/roleMatrix';
import { UserRole, ActiveSection } from '../../types';

describe('B0a Fail-Closed Role Gate', () => {
  it('should DENY all sections for an unknown/undefined role', () => {
    const unknownRole = 'UNKNOWN_INJECTED_ROLE' as unknown as UserRole;
    const testSections: ActiveSection[] = [
      'home',
      'nur',
      'settings',
      'security',
      'experiments',
      'minfinity',
      'metalogos',
    ];

    testSections.forEach((section) => {
      const allowed = isSectionAllowedForRole(unknownRole, section);
      expect(allowed).toBe(false);
    });
  });

  it('should have no capability config defined for unknown roles', () => {
    const unknownRole = 'MALICIOUS_ROLE' as unknown as UserRole;
    expect(ROLE_CAPABILITIES[unknownRole]).toBeUndefined();
  });

  it('should preserve expected section permissions for valid known roles', () => {
    expect(isSectionAllowedForRole('Child', 'home')).toBe(true);
    expect(isSectionAllowedForRole('Child', 'security')).toBe(false);
    expect(isSectionAllowedForRole('Adult', 'home')).toBe(true);
    expect(isSectionAllowedForRole('Adult', 'security')).toBe(true);
    expect(isSectionAllowedForRole('Shura', 'settings')).toBe(true);
  });
});
