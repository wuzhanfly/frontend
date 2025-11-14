import React from 'react';

import { test, expect } from 'playwright/lib';
import * as pwConfig from 'playwright/utils/config';

import AppError from './AppError';

const { t } = (() => {
  // Mock translation function for tests
  const mockT = (key: string) => {
    const keyMap: Record<string, string> = {
      'transactions.common.not_found': 'Not found',
    };
    return keyMap[key] || key;
  };
  return { t: mockT };
})();

test('status code 404', async({ render, page }) => {
  const error = { message: t('transactions.common.not_found'), cause: { status: 404 } } as Error;
  const component = await render(<AppError error={ error }/>);
  await expect(component).toHaveScreenshot({
    mask: [ page.locator(pwConfig.adsBannerSelector) ],
    maskColor: pwConfig.maskColor,
  });
});

test('status code 422', async({ render }) => {
  const error = { message: 'Unprocessable entry', cause: { status: 422 } } as Error;
  const component = await render(<AppError error={ error }/>);
  await expect(component).toHaveScreenshot();
});

test('status code 403', async({ render }) => {
  const error = { message: 'Test', cause: { status: 403 } } as Error;
  const component = await render(<AppError error={ error }/>);
  await expect(component).toHaveScreenshot();
});

test('status code 500', async({ render }) => {
  const error = { message: t('api.common.unknown_error'), cause: { status: 500 } } as Error;
  const component = await render(<AppError error={ error }/>);
  await expect(component).toHaveScreenshot();
});

test('tx not found', async({ render }) => {
  const error = { message: t('transactions.common.not_found'), cause: { status: 404, resource: 'general:tx' } } as Error;
  const component = await render(<AppError error={ error }/>);
  await expect(component).toHaveScreenshot();
});

test('block lost consensus', async({ render }) => {
  const error = {
    message: t('transactions.common.not_found'),
    cause: { payload: { message: t('shared.common.block_lost_consensus'), hash: 'hash' } },
  } as Error;
  const component = await render(<AppError error={ error }/>);
  await expect(component).toHaveScreenshot();
});

test('too many requests +@mobile', async({ render }) => {
  const error = {
    message: t('shared.common.too_many_requests'),
    cause: { status: 429 },
    rateLimits: { bypassOptions: 'temporary_token', reset: '42000' },
  } as unknown as Error;
  const component = await render(<AppError error={ error }/>);
  await expect(component).toHaveScreenshot();
});
