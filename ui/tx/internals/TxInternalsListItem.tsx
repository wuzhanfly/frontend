import { Flex, HStack } from '@chakra-ui/react';
import { Badge } from 'toolkit/chakra/badge';
import AddressFromTo from 'ui/shared/address/AddressFromTo';
import BigNumber from 'bignumber.js';
import { Skeleton } from 'toolkit/chakra/skeleton';

import config from 'configs/app';
import { currencyUnits } from 'lib/units';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { InternalTransaction } from 'types/api/internalTransaction';
import { getTxInternalsItems } from './utils';
import ListItemMobile from 'ui/shared/ListItemMobile/ListItemMobile';
import TxStatus from 'ui/shared/statusTag/TxStatus';

type Props = InternalTransaction & { isLoading?: boolean };

const TxInternalsListItem = ({ type, from, to, value, success, error, gas_limit: gasLimit, created_contract: createdContract, isLoading }: Props) => {
  const { t } = useTranslation();
  const typeTitle = getTxInternalsItems(t).find(({ id }) => id === type)?.title;
  const toData = to ? to : createdContract;

  return (
    <ListItemMobile rowGap={ 3 }>
      <Flex columnGap={ 2 }>
        { typeTitle && <Badge colorPalette="cyan" loading={ !!isLoading }>{ typeTitle }</Badge> }
        <TxStatus status={ success ? 'ok' : 'error' } errorText={ error } isLoading={ isLoading }/>
      </Flex>
      <AddressFromTo
        from={ from }
        to={ toData }
        isLoading={ isLoading }
        w="100%"
        fontWeight="500"
      />
      <HStack gap={ 3 }>
        <Skeleton loading={ isLoading } fontSize="sm" fontWeight={ 500 }><span>{t('common.common.value')} { currencyUnits.ether }</span></Skeleton>
        <Skeleton loading={ isLoading } fontSize="sm" color="text.secondary">
          <span>
            { BigNumber(value).div(BigNumber(10 ** config.chain.currency.decimals)).toFormat() }
          </span>
        </Skeleton>
      </HStack>
      <HStack gap={ 3 }>
        <Skeleton loading={ isLoading } fontSize="sm" fontWeight={ 500 }><span>{t('common.common.gas_limit')}</span></Skeleton>
        <Skeleton loading={ isLoading } fontSize="sm" color="text.secondary"><span>{ BigNumber(gasLimit).toFormat() }</span></Skeleton>
      </HStack>
    </ListItemMobile>
  );
};

export default TxInternalsListItem;
