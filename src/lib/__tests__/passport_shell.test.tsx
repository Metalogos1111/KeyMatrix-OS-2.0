import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PassportShell } from '../../components/passport/PassportShell';

describe('PassportShell Visual Scaffolding', () => {
  it('renders skeleton shimmer by default without injecting unproven data', () => {
    const html = renderToStaticMarkup(React.createElement(PassportShell));
    expect(html).toContain('passport-shell-container');
    expect(html).toContain('passport-skeleton-view');
    expect(html).toContain('SKELETON_ONLY');
    expect(html).toContain('Awaiting Identity Runtime Birth');
    // Ensure no fake DID or live balance is asserted
    expect(html).not.toContain('1,250,000');
    expect(html).not.toContain('did:key:km_live');
  });

  it('maintains gate indicator status when isUnlocked is false', () => {
    const html = renderToStaticMarkup(React.createElement(PassportShell, { isUnlocked: false }));
    expect(html).toContain('SKELETON_ONLY');
  });
});
