import { html, fixture, expect } from '@open-wc/testing';

import '../src/karaoke-night';

describe('<karaoke-night>', () => {
  it('has a default property header', async () => {
    const el = await fixture('<karaoke-night></karaoke-night>');
    expect(el.list_header).to.equal('open-wc');
  });

  it('allows property header to be overwritten', async () => {
    const el = await fixture(html`
      <karaoke-night title="different"></karaoke-night>
    `);
    expect(el.list_header).to.equal('different');
  });
});
