import { Flex } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ValidatorZilliqa } from 'types/api/validators';

import config from 'configs/app';
import { Skeleton } from 'toolkit/chakra/skeleton';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import DetailedInfoSponsoredItem from 'ui/shared/DetailedInfo/DetailedInfoSponsoredItem';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';
import HashStringShortenDynamic from 'ui/shared/HashStringShortenDynamic';
import NativeTokenIcon from 'ui/shared/NativeTokenIcon';

interface Props {
  data: ValidatorZilliqa;
  isLoading: boolean;
}

const ValidatorDetails = ({ data, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <DetailedInfo.Container>
      <DetailedInfo.ItemLabel
        hint={t('validators.common.index_of_the_staker_in_the_com')}
        isLoading={ isLoading }
      >
        { t('validators.zilliqa.index') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isLoading } display="inline">
          { data.index }
        </Skeleton>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={t('validators.common.stakers_balance')}
        isLoading={ isLoading }
      >
        { t('validators.zilliqa.staked') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <NativeTokenIcon isLoading={ isLoading } boxSize={ 5 } mr={ 2 }/>
        <Skeleton loading={ isLoading } display="inline">
          { BigNumber(data.balance).div(BigNumber(10 ** config.chain.currency.decimals)).toFormat() } { config.chain.currency.symbol }
        </Skeleton>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={t('validators.common.libp2p_peer_id_corresponding_t')}
        isLoading={ isLoading }
      >
        { t('validators.zilliqa.peer_id') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Flex alignItems="center" w="100%" minWidth={ 0 }>
          <Skeleton loading={ isLoading } maxW="calc(100% - 28px)" overflow="hidden">
            <HashStringShortenDynamic hash={ data.peer_id }/>
          </Skeleton>
          <CopyToClipboard text={ data.peer_id } isLoading={ isLoading }/>
        </Flex>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={t('validators.zilliqa.control_address_hint')}
        isLoading={ isLoading }
      >
        { t('validators.zilliqa.control_address') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <AddressEntity address={ data.control_address } isLoading={ isLoading }/>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={t('validators.zilliqa.reward_address_hint')}
        isLoading={ isLoading }
      >
        { t('validators.zilliqa.reward_address') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <AddressEntity address={ data.reward_address } isLoading={ isLoading }/>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={t('validators.common.the_address_whose_key_the_vali')}
        isLoading={ isLoading }
      >
        { t('validators.zilliqa.signing_address') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <AddressEntity address={ data.signing_address } isLoading={ isLoading }/>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={t('validators.common.block_number_at_which_the_stak')}
        isLoading={ isLoading }
      >
        { t('validators.zilliqa.added_at_block') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <BlockEntity number={ data.added_at_block_number } isLoading={ isLoading }/>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={t('validators.zilliqa.stake_updated_hint')}
        isLoading={ isLoading }
      >
        { t('validators.zilliqa.stake_updated') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <BlockEntity number={ data.stake_updated_at_block_number } isLoading={ isLoading }/>
      </DetailedInfo.ItemValue>

      <DetailedInfoSponsoredItem isLoading={ isLoading }/>
    </DetailedInfo.Container>
  );
};

export default React.memo(ValidatorDetails);
