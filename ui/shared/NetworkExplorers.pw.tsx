import React from 'react';

import { test, expect } from 'playwright/lib';

import NetworkExplorers from './NetworkExplorers';

const { t } = (() => {
  // Mock translation function for tests
  const mockT = (key: string) => {
    const keyMap: Record<string, string> = {
      'shared.common.verify_with_other_explorers': 'Verify with other explorers',
    };
    return keyMap[key] || key;
  };
  return { t: mockT };
})();

test('base view', async({ render, page }) => {
  const component = await render(<NetworkExplorers type="tx" pathParam="0x123"/>);
  await component.getByLabel(t('shared.common.verify_with_other_explorers')).click();
  await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 150 } });
});
