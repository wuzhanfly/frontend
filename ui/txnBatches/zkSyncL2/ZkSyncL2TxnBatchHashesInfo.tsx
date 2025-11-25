import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ZkSyncBatch } from 'types/api/zkSyncL2';

import { Skeleton } from 'toolkit/chakra/skeleton';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import DetailedInfoTimestamp from 'ui/shared/DetailedInfo/DetailedInfoTimestamp';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';

interface Props {
  isLoading: boolean;
  data: Pick<
    ZkSyncBatch,
  'commit_transaction_hash' |
  'commit_transaction_timestamp' |
  'prove_transaction_hash' |
  'prove_transaction_timestamp' |
  'execute_transaction_hash' |
  'execute_transaction_timestamp'
  >;
}

const ZkSyncL2TxnBatchHashesInfo = ({ isLoading, data }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <DetailedInfo.ItemLabel
        hint={t('common.common.hash_of_l1_tx_on_which_the_bat')}
        isLoading={ isLoading }
      >
        { t('common.common.commit_tx_hash') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue multiRow >
        { data.commit_transaction_hash ? (
          <>
            <TxEntityL1
              isLoading={ isLoading }
              hash={ data.commit_transaction_hash }
              maxW="100%"
            />
            { data.commit_transaction_timestamp && (
              <Flex alignItems="center" maxW="100%">
                <DetailedInfoTimestamp timestamp={ data.commit_transaction_timestamp } isLoading={ isLoading }/>
              </Flex>
            ) }
          </>
        ) : <Skeleton loading={ isLoading }>{ t('shared.common.pending') }</Skeleton> }
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={t('common.common.hash_of_l1_tx_on_which_the_batch_was_proven')}
        isLoading={ isLoading }
      >
        { t('common.common.prove_tx_hash') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue multiRow>
        { data.prove_transaction_hash ? (
          <>
            <TxEntityL1
              isLoading={ isLoading }
              hash={ data.prove_transaction_hash }
              maxW="100%"
            />
            { data.prove_transaction_timestamp && (
              <Flex alignItems="center" maxW="100%">
                <DetailedInfoTimestamp timestamp={ data.prove_transaction_timestamp } isLoading={ isLoading }/>
              </Flex>
            ) }
          </>
        ) : <Skeleton loading={ isLoading }>{ t('shared.common.pending') }</Skeleton> }
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={t('common.common.hash_of_l1_tx_on_which_the_batch_was_executed_and_finalized')}
        isLoading={ isLoading }
      >
        { t('common.common.execute_tx_hash') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue multiRow>
        { data.execute_transaction_hash ? (
          <>
            <TxEntityL1
              isLoading={ isLoading }
              hash={ data.execute_transaction_hash }
              maxW="100%"
            />
            { data.execute_transaction_timestamp && (
              <Flex alignItems="center" maxW="100%">
                <DetailedInfoTimestamp timestamp={ data.execute_transaction_timestamp } isLoading={ isLoading }/>
              </Flex>
            ) }
          </>
        ) : <Skeleton loading={ isLoading }>{ t('shared.common.pending') }</Skeleton> }
      </DetailedInfo.ItemValue>
    </>
  );
};

export default React.memo(ZkSyncL2TxnBatchHashesInfo);
