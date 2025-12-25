import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { Transaction } from 'types/api/transaction';

import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import TextSeparator from 'ui/shared/TextSeparator';

type Props = Pick<Transaction, 'nonce' | 'type' | 'position'> & { queueIndex?: number };

const TxDetailsOther = ({ nonce, type, position, queueIndex }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <DetailedInfo.ItemLabel
        hint={ t('transactions.common.other_data_related_to_this_tra') }
      >
        { t('common.common.other') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue multiRow>
        {
          [
            typeof type === 'number' && (
              <Box key="type">
                <span>{ t('transactions.common.txn_type') }: </span>
                <span>{ type }</span>
                { type === 2 && <Text as="span" ml={ 1 } color="text.secondary">(EIP-1559)</Text> }
                { type === 3 && <Text as="span" ml={ 1 } color="text.secondary">(EIP-4844)</Text> }
                { type === 4 && <Text as="span" ml={ 1 } color="text.secondary">(EIP-7702)</Text> }
              </Box>
            ),
            queueIndex !== undefined ? (
              <Box key="queueIndex">
                <span>{ t('transactions.common.queue_index') }: </span>
                <span>{ queueIndex }</span>
              </Box>
            ) : (
              <Box key="nonce">
                <span>{ t('transactions.common.nonce') }: </span>
                <span>{ nonce }</span>
              </Box>
            ),
            position !== null && position !== undefined && (
              <Box key="position">
                <span>{ t('transactions.common.position') }: </span>
                <span>{ position }</span>
              </Box>
            ),
          ]
            .filter(Boolean)
            .map((item, index) => (
              <React.Fragment key={ index }>
                { index !== 0 && <TextSeparator/> }
                { item }
              </React.Fragment>
            ))
        }
      </DetailedInfo.ItemValue>
    </>
  );
};

export default TxDetailsOther;
