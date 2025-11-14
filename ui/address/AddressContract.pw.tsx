import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Abi } from 'viem';

import * as addressMock from 'mocks/address/address';
import * as contractInfoMock from 'mocks/contract/info';
import * as contractMethodsMock from 'mocks/contract/methods';
import { ENVS_MAP } from 'playwright/fixtures/mockEnvs';
import * as socketServer from 'playwright/fixtures/socketServer';
import { test, expect } from 'playwright/lib';

import AddressContract from './AddressContract';

const hash = addressMock.contract.hash;

test.describe('ABI functionality', () => {
  test.beforeEach(async({ mockApiResponse }) => {
    await mockApiResponse('general:address', addressMock.contract, { pathParams: { hash } });
    await mockApiResponse(
      'general:contract',
      { ...contractInfoMock.verified, abi: [ ...contractMethodsMock.read, ...contractMethodsMock.write ] as Abi },
      { pathParams: { hash } },
    );
  });

  test('read', async({ render, createSocket }) => {
    // Mock translation function for tests
    const t = (key: string) => key;
    const hooksConfig = {
      router: {
        query: { hash, tab: 'read_contract' },
      },
    };
    const component = await render(<AddressContract addressData={ addressMock.contract }/>, { hooksConfig }, { withSocket: true });
    const socket = await createSocket();
    await socketServer.joinChannel(socket, 'addresses:' + addressMock.contract.hash.toLowerCase());

    await expect(component.getByRole('button', { name: t('staking.common.connect_wallet') })).toBeVisible();
    await component.getByText('FLASHLOAN_PREMIUM_TOTAL').click();
    await expect(component.getByLabel('FLASHLOAN_PREMIUM_TOTAL').getByRole('button', { name: t('addresses.common.read') })).toBeVisible();
  });

  test('read, no wallet client', async({ render, createSocket, mockEnvs }) => {
    // Mock translation function for tests
    const t = (key: string) => key;
    const hooksConfig = {
      router: {
        query: { hash, tab: 'read_contract' },
      },
    };
    await mockEnvs(ENVS_MAP.noWalletClient);
    const component = await render(<AddressContract addressData={ addressMock.contract }/>, { hooksConfig }, { withSocket: true });
    const socket = await createSocket();
    await socketServer.joinChannel(socket, 'addresses:' + addressMock.contract.hash.toLowerCase());

    await expect(component.getByRole('button', { name: t('staking.common.connect_wallet') })).toBeHidden();
    await component.getByText('FLASHLOAN_PREMIUM_TOTAL').click();
    await expect(component.getByLabel('FLASHLOAN_PREMIUM_TOTAL').getByRole('button', { name: t('addresses.common.read') })).toBeVisible();
  });

  test('write', async({ render, createSocket }) => {
    // Mock translation function for tests
    const t = (key: string) => key;
    const hooksConfig = {
      router: {
        query: { hash, tab: 'write_contract' },
      },
    };
    const component = await render(<AddressContract addressData={ addressMock.contract }/>, { hooksConfig }, { withSocket: true });
    const socket = await createSocket();
    await socketServer.joinChannel(socket, 'addresses:' + addressMock.contract.hash.toLowerCase());

    await expect(component.getByRole('button', { name: t('staking.common.connect_wallet') })).toBeVisible();
    await component.getByText('setReserveInterestRateStrategyAddress').click();
    await expect(component.getByLabel('9.').getByRole('button', { name: t('addresses.common.simulate') })).toBeEnabled();
    await expect(component.getByLabel('9.').getByRole('button', { name: t('addresses.common.write') })).toBeEnabled();

    await component.getByText('pause').click();
    await expect(component.getByLabel('5.').getByRole('button', { name: t('addresses.common.simulate') })).toBeEnabled();
    await expect(component.getByLabel('5.').getByRole('button', { name: t('addresses.common.write') })).toBeEnabled();
  });

  test('write, no wallet client', async({ render, createSocket, mockEnvs }) => {
    // Mock translation function for tests
    const t = (key: string) => key;
    const hooksConfig = {
      router: {
        query: { hash, tab: 'write_contract' },
      },
    };
    await mockEnvs(ENVS_MAP.noWalletClient);

    const component = await render(<AddressContract addressData={ addressMock.contract }/>, { hooksConfig }, { withSocket: true });
    const socket = await createSocket();
    await socketServer.joinChannel(socket, 'addresses:' + addressMock.contract.hash.toLowerCase());

    await expect(component.getByRole('button', { name: t('staking.common.connect_wallet') })).toBeHidden();
    await component.getByText('setReserveInterestRateStrategyAddress').click();
    await expect(component.getByLabel('9.').getByRole('button', { name: t('addresses.common.simulate') })).toBeEnabled();
    await expect(component.getByLabel('9.').getByRole('button', { name: t('addresses.common.write') })).toBeDisabled();

    await component.getByText('pause').click();
    await expect(component.getByLabel('5.').getByRole('button', { name: t('addresses.common.simulate') })).toBeEnabled();
    await expect(component.getByLabel('5.').getByRole('button', { name: t('addresses.common.write') })).toBeDisabled();
  });
});

test.describe('auto verification status', () => {
  const addressData = { ...addressMock.contract, is_verified: false, implementations: [] };
  let contractApiUrl: string;

  test.beforeEach(async({ mockApiResponse }) => {
    await mockApiResponse('general:address', addressData, { pathParams: { hash } });
    contractApiUrl = await mockApiResponse('general:contract', contractInfoMock.nonVerified, { pathParams: { hash } });
  });

  test('base flow', async({ render, createSocket }) => {
    const hooksConfig = {
      router: {
        query: { hash, tab: 'contract' },
      },
    };
    const component = await render(<AddressContract addressData={ addressData }/>, { hooksConfig }, { withSocket: true });

    const socket = await createSocket();
    const channel = await socketServer.joinChannel(socket, 'addresses:' + addressData.hash.toLowerCase());

    socketServer.sendMessage(socket, channel, 'eth_bytecode_db_lookup_started', { });
    const tabs = component.getByRole('tablist').first();
    await expect(tabs).toHaveScreenshot();
  });

  test('after verification will refetch contract data', async({ page, render, createSocket }) => {
    const hooksConfig = {
      router: {
        query: { hash, tab: 'contract' },
      },
    };
    await render(<AddressContract addressData={ addressData }/>, { hooksConfig }, { withSocket: true });

    const socket = await createSocket();
    const channel = await socketServer.joinChannel(socket, 'addresses:' + addressData.hash.toLowerCase());

    socketServer.sendMessage(socket, channel, 'smart_contract_was_verified', { });

    const contractRequest = await page.waitForRequest(contractApiUrl);
    expect(contractRequest).toBeTruthy();
  });

  test('with one tab', async({ render, createSocket, mockEnvs }) => {
    const hooksConfig = {
      router: {
        query: { hash, tab: 'contract' },
      },
    };
    await mockEnvs([
      [ 'NEXT_PUBLIC_IS_ACCOUNT_SUPPORTED', 'false' ],
    ]);
    const component = await render(<AddressContract addressData={ addressData }/>, { hooksConfig }, { withSocket: true });

    const socket = await createSocket();
    const channel = await socketServer.joinChannel(socket, 'addresses:' + addressData.hash.toLowerCase());

    socketServer.sendMessage(socket, channel, 'smart_contract_was_not_verified', { });
    const tabs = component.getByRole('tablist').first();
    await expect(tabs).toHaveScreenshot();
  });
});
