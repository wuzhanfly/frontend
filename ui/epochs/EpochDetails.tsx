import { Box, chakra } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { CeloEpochDetails } from 'types/api/epochs';

import config from 'configs/app';
import getCurrencyValue from 'lib/getCurrencyValue';
import useIsMobile from 'lib/hooks/useIsMobile';
import { Skeleton } from 'toolkit/chakra/skeleton';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import DetailedInfoTimestamp from 'ui/shared/DetailedInfo/DetailedInfoTimestamp';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';
import TokenEntity from 'ui/shared/entities/token/TokenEntity';
import CeloEpochStatus from 'ui/shared/statusTag/CeloEpochStatus';
import TokenTransferSnippet from 'ui/shared/TokenTransferSnippet/TokenTransferSnippet';

import EpochElectionRewards from './electionRewards/EpochElectionRewards';

interface Props {
  data: CeloEpochDetails;
  isLoading?: boolean;
}

const EpochDetails = ({ data, isLoading }: Props) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const totalFunRewards = data.distribution?.transfers_total?.total ? getCurrencyValue({
    value: data.distribution?.transfers_total.total.value,
    decimals: data.distribution?.transfers_total.total.decimals,
  }) : null;

  const processingRange = (() => {
  const { t } = useTranslation();
    if (!data.start_processing_block_number || !data.end_processing_block_number) {
      return <Box color="text.secondary">N/A</Box>;
    }

    if (data.start_processing_block_number === data.end_processing_block_number) {
      return <BlockEntity number={ data.start_processing_block_number } isLoading={ isLoading } noIcon/>;
    }

    return (
      <>
        <BlockEntity number={ data.start_processing_block_number } isLoading={ isLoading } noIcon/>
        <chakra.span color="text.secondary" whiteSpace="pre"> - </chakra.span>
        <BlockEntity number={ data.end_processing_block_number } isLoading={ isLoading } noIcon/>
      </>
    );
  })();

  return (
    <>
      <DetailedInfo.Container>
        <DetailedInfo.ItemLabel
          hint={t('epochs.common.current_status_of_the_epoch')}
          isLoading={ isLoading }
        >
          Status
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          <CeloEpochStatus
            isFinalized={ data.is_finalized }
            loading={ isLoading }
          />
        </DetailedInfo.ItemValue>
        <DetailedInfo.ItemLabel
          hint={t('epochs.common.timestamp_of_the_block_where_t')}
          isLoading={ isLoading }
        >
          Timestamp
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          { data.timestamp ?
            <DetailedInfoTimestamp timestamp={ data.timestamp } isLoading={ isLoading }/> :
            <Box color="text.secondary" whiteSpace="pre-wrap">Epochs are finalized approximately once a day</Box> }
        </DetailedInfo.ItemValue>
        <DetailedInfo.ItemLabel
        // eslint-disable-next-line max-len
          hint={ `The range of blocks during which the epoch is processed — i.e., from the block where the "EpochProcessingStarted" event is emitted to the block where the "EpochProcessingEnded" event is emitted` }
          isLoading={ isLoading }
        >
          Processing range
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          { processingRange }
        </DetailedInfo.ItemValue>
        <DetailedInfo.ItemLabel
          hint={t('epochs.common.funds_allocation_to_support_ce')}
          isLoading={ isLoading }
        >
          Community fund
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue multiRow>
          { data.distribution?.community_transfer ? (
            <TokenTransferSnippet
              data={ data.distribution.community_transfer }
              isLoading={ isLoading }
              noAddressIcons={ isMobile }
            />
          ) : (
            <Box color="text.secondary">N/A</Box>
          ) }
        </DetailedInfo.ItemValue>
        <DetailedInfo.ItemLabel
          hint={t('epochs.common.funds_allocation_to_support_pr')}
          isLoading={ isLoading }
        >
          Carbon offset fund
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue multiRow>
          { data.distribution?.carbon_offsetting_transfer ? (
            <TokenTransferSnippet
              data={ data.distribution.carbon_offsetting_transfer }
              isLoading={ isLoading }
              noAddressIcons={ isMobile }
            />
          ) : (
            <Box color="text.secondary">N/A</Box>
          ) }
        </DetailedInfo.ItemValue>
        <DetailedInfo.ItemLabel
          hint={t('epochs.common.sum_of_all_fund_allocations')}
          isLoading={ isLoading }
        >
          Total fund rewards
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue gap={ 2 }>
          { totalFunRewards ? (
            <>
              <Skeleton loading={ isLoading }>
                <span>{ totalFunRewards.valueStr }</span>
              </Skeleton>
              { data.distribution?.transfers_total?.token ? (
                <TokenEntity
                  token={ data.distribution?.transfers_total.token }
                  isLoading={ isLoading }
                  noCopy
                  onlySymbol
                />
              ) :
                config.chain.currency.symbol }
            </>
          ) : (
            <Box color="text.secondary">N/A</Box>
          ) }
        </DetailedInfo.ItemValue>
      </DetailedInfo.Container>
      <EpochElectionRewards data={ data } isLoading={ isLoading }/>
    </>
  );
};

export default React.memo(EpochDetails);
