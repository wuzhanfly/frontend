import { Box, Text, Flex } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { Transaction } from 'types/api/transaction';

import { route } from 'nextjs/routes';

import config from 'configs/app';
import { useMultichainContext } from 'lib/contexts/multichain';
import getValueWithUnit from 'lib/getValueWithUnit';
import { currencyUnits } from 'lib/units';
import { Link } from 'toolkit/chakra/link';
import BlobEntity from 'ui/shared/entities/blob/BlobEntity';
import TextSeparator from 'ui/shared/TextSeparator';
import TxFee from 'ui/shared/tx/TxFee';
import Utilization from 'ui/shared/Utilization/Utilization';

const TxAdditionalInfoContent = ({ tx }: { tx: Transaction }) => {
  const { t } = useTranslation();
  const multichainContext = useMultichainContext();

  const sectionProps = {
    borderBottom: '1px solid',
    borderColor: 'border.divider',
    paddingBottom: 4,
  };

  const sectionTitleProps = {
    color: 'text.secondary',
    fontWeight: 600,
    marginBottom: 3,
  };

  return (
    <>
      { tx.blob_versioned_hashes && tx.blob_versioned_hashes.length > 0 && (
        <Box { ...sectionProps } mb={ 4 }>
          <Flex alignItems="center" justifyContent="space-between">
            <Text { ...sectionTitleProps }>{ t('txs.common.blobs_count', { count: tx.blob_versioned_hashes.length }) }</Text>
            { tx.blob_versioned_hashes.length > 3 && (
              <Link
                href={ route({ pathname: '/tx/[hash]', query: { hash: tx.hash, tab: 'blobs' } }) }
                mb={ 3 }
              >
                { t('txs.common.view_all') }
              </Link>
            ) }
          </Flex>
          <Flex flexDir="column" rowGap={ 3 }>
            { tx.blob_versioned_hashes.slice(0, 3).map((hash, index) => (
              <Flex key={ hash } columnGap={ 2 }>
                <Box fontWeight={ 500 }>{ index + 1 }</Box>
                <BlobEntity hash={ hash } noIcon/>
              </Flex>
            )) }
          </Flex>
        </Box>
      ) }
      { !config.UI.views.tx.hiddenFields?.tx_fee && (
        <Box { ...sectionProps } mb={ 4 }>
          { (tx.stability_fee !== undefined || tx.fee.value !== null) && (
            <>
              <Text { ...sectionTitleProps }>{ t('txs.common.transaction_fee') }</Text>
              <TxFee tx={ tx } withUsd accuracyUsd={ 2 } rowGap={ 0 }/>
            </>
          ) }
        </Box>
      ) }
      { tx.gas_used !== null && (
        <Box { ...sectionProps } mb={ 4 }>
          <Text { ...sectionTitleProps }>{ t('txs.common.gas_limit_usage') }</Text>
          <Flex>
            <Text>{ BigNumber(tx.gas_used).toFormat() }</Text>
            <TextSeparator/>
            <Text>{ BigNumber(tx.gas_limit).toFormat() }</Text>
            <Utilization ml={ 4 } value={ Number(BigNumber(tx.gas_used).dividedBy(BigNumber(tx.gas_limit)).toFixed(2)) }/>
          </Flex>
        </Box>
      ) }
      { !config.UI.views.tx.hiddenFields?.gas_fees &&
        (tx.base_fee_per_gas !== null || tx.max_fee_per_gas !== null || tx.max_priority_fee_per_gas !== null) && (
        <Box { ...sectionProps } mb={ 4 }>
          <Text { ...sectionTitleProps }>{ t('txs.common.gas_fees_gwei', { unit: currencyUnits.gwei }) }</Text>
          { tx.base_fee_per_gas !== null && (
            <Box>
              <Text as="span" fontWeight="500">{ t('txs.common.base_fee_label') }</Text>
              <Text fontWeight="700" as="span">{ getValueWithUnit(tx.base_fee_per_gas, 'gwei').toFormat() }</Text>
            </Box>
          ) }
          { tx.max_fee_per_gas !== null && (
            <Box mt={ 1 }>
              <Text as="span" fontWeight="500">{ t('txs.common.max_fee_label') }</Text>
              <Text fontWeight="700" as="span">{ getValueWithUnit(tx.max_fee_per_gas, 'gwei').toFormat() }</Text>
            </Box>
          ) }
          { tx.max_priority_fee_per_gas !== null && (
            <Box mt={ 1 }>
              <Text as="span" fontWeight="500">{ t('txs.common.max_priority_fee_label') }</Text>
              <Text fontWeight="700" as="span">{ getValueWithUnit(tx.max_priority_fee_per_gas, 'gwei').toFormat() }</Text>
            </Box>
          ) }
        </Box>
      ) }
      { !(tx.blob_versioned_hashes && tx.blob_versioned_hashes.length > 0) && (
        <Box { ...sectionProps } mb={ 4 }>
          <Text { ...sectionTitleProps }>{ t('common.common.others') }</Text>
          <Box>
            <Text as="span" fontWeight="500">{ t('txs.common.txn_type_label') }</Text>
            <Text fontWeight="600" as="span">{ tx.type }</Text>
            { tx.type === 2 && <Text fontWeight="400" as="span" ml={ 1 } color="text.secondary">({ t('txs.common.eip_1559') })</Text> }
          </Box>
          <Box mt={ 1 }>
            <Text as="span" fontWeight="500">{ t('txs.common.nonce_label') }</Text>
            <Text fontWeight="600" as="span">{ tx.nonce }</Text>
          </Box>
          <Box mt={ 1 }>
            <Text as="span" fontWeight="500">{ t('txs.common.position_label') }</Text>
            <Text fontWeight="600" as="span">{ tx.position }</Text>
          </Box>
        </Box>
      ) }
      <Link href={ route({ pathname: '/tx/[hash]', query: { hash: tx.hash } }, multichainContext) }>{ t('txs.common.more_details') }</Link>
    </>
  );
};

export default React.memo(TxAdditionalInfoContent);
