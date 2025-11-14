import React from 'react';

import { test, expect } from 'playwright/lib';

import StatsWidget from './StatsWidget';

const t = (key: string) => key;

test.use({ viewport: { width: 300, height: 100 } });

test('with positive diff +@dark-mode', async({ render }) => {
  const component = await render(
    <StatsWidget
      label='common.common.verified_contracts'
      hint={t('stats.common.contracts_that_have_been_verified')}
      value="1 000 000"
      diff={ 4200 }
      diffFormatted="4 200"
    />,
  );

  await expect(component).toHaveScreenshot();
});

// according to current logic we don't show diff if it's negative
test('with negative diff', async({ render }) => {
  const component = await render(
    <StatsWidget
      label='common.common.verified_contracts'
      hint={t('stats.common.contracts_that_have_been_verified')}
      value="1,000,000"
      diff={ -4200 }
    />,
  );

  await expect(component).toHaveScreenshot();
});

test('loading state', async({ render }) => {
  const component = await render(
    <StatsWidget
      label='common.common.verified_contracts'
      hint={t('stats.common.contracts_that_have_been_verified')}
      value="1,000,000"
      isLoading
    />,
  );

  await expect(component).toHaveScreenshot();
});

test('with period only', async({ render }) => {
  const component = await render(
    <StatsWidget
      label='common.common.verified_contracts'
      hint={t('stats.common.contracts_that_have_been_verified')}
      value="1,000,000"
      period="1h"
    />,
  );

  await expect(component).toHaveScreenshot();
});
