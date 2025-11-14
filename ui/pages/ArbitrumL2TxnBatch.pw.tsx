import React from 'react';

import { batchData, batchDataAnytrust, batchDataCelestia } from 'mocks/arbitrum/txnBatch';
import { ENVS_MAP } from 'playwright/fixtures/mockEnvs';
import { test, expect, devices } from 'playwright/lib';

import ArbitrumL2TxnBatch from './ArbitrumL2TxnBatch';

const { t } = (() => {
  // Mock translation function for tests
  const mockT = (key: string) => {
    const keyMap: Record<string, string> = {
      'common.common.show_data_availability_info': 'Show data availability info',
    };
    return keyMap[key] || key;
  };
  return { t: mockT };
})();

const batchNumber = '5';
const hooksConfig = {
  router: {
    query: { number: batchNumber },
  },
};

test.beforeEach(async({ mockTextAd, mockEnvs }) => {
  await mockEnvs(ENVS_MAP.arbitrumRollup);
  await mockTextAd();
});

test('base view', async({ render, mockApiResponse }) => {
  await mockApiResponse('general:arbitrum_l2_txn_batch', batchData, { pathParams: { number: batchNumber } });
  const component = await render(<ArbitrumL2TxnBatch/>, { hooksConfig });
  await expect(component).toHaveScreenshot();
});

test('with anytrust DA', async({ render, mockApiResponse }) => {
  await mockApiResponse('general:arbitrum_l2_txn_batch', batchDataAnytrust, { pathParams: { number: batchNumber } });
  const component = await render(<ArbitrumL2TxnBatch/>, { hooksConfig });
  await component.getByText(t('common.common.show_data_availability_info')).click();
  await expect(component).toHaveScreenshot();
});

test('with celestia DA', async({ render, mockApiResponse }) => {
  await mockApiResponse('general:arbitrum_l2_txn_batch', batchDataCelestia, { pathParams: { number: batchNumber } });
  const component = await render(<ArbitrumL2TxnBatch/>, { hooksConfig });
  await component.getByText(t('common.common.show_data_availability_info')).click();
  await expect(component).toHaveScreenshot();
});

test.describe('mobile', () => {
  test.use({ viewport: devices['iPhone 13 Pro'].viewport });
  test('base view', async({ render, mockApiResponse }) => {
    await mockApiResponse('general:arbitrum_l2_txn_batch', batchData, { pathParams: { number: batchNumber } });
    const component = await render(<ArbitrumL2TxnBatch/>, { hooksConfig });
    await expect(component).toHaveScreenshot();
  });

  test('with anytrust DA', async({ render, mockApiResponse }) => {
    await mockApiResponse('general:arbitrum_l2_txn_batch', batchDataAnytrust, { pathParams: { number: batchNumber } });
    const component = await render(<ArbitrumL2TxnBatch/>, { hooksConfig });
    await component.getByText(t('common.common.show_data_availability_info')).click();
    await expect(component).toHaveScreenshot();
  });

  test('with celestia DA', async({ render, mockApiResponse, page }) => {
    await mockApiResponse('general:arbitrum_l2_txn_batch', batchDataCelestia, { pathParams: { number: batchNumber } });
    const component = await render(<ArbitrumL2TxnBatch/>, { hooksConfig });
    await component.getByText(t('common.common.show_data_availability_info')).click();
    await page.mouse.move(0, 0);
    await expect(component).toHaveScreenshot();
  });
});
