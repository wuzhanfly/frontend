import { Flex } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ValidatorBlackfort } from 'types/api/validators';

import config from 'configs/app';
import { currencyUnits } from 'lib/units';
import { Skeleton } from 'toolkit/chakra/skeleton';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import ListItemMobileGrid from 'ui/shared/ListItemMobile/ListItemMobileGrid';
import TruncatedValue from 'ui/shared/TruncatedValue';

interface Props {
  data: ValidatorBlackfort;
  isLoading?: boolean;
}

const ValidatorsListItem = ({ data, isLoading }: Props) => {
  const { t } = useTranslation();

  return (
    <ListItemMobileGrid.Container gridTemplateColumns="130px auto">

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('common.common.address') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <AddressEntity
          isLoading={ isLoading }
          address={ data.address }
          truncation="constant"
        />
      </ListItemMobileGrid.Value>

      { data.name && (
        <>
          <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('common.common.name') }</ListItemMobileGrid.Label>
          <ListItemMobileGrid.Value>
            <Flex><TruncatedValue value={ data.name } isLoading={ isLoading }/></Flex>
          </ListItemMobileGrid.Value>
        </>
      ) }

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('common.common.commission') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton loading={ isLoading }>
          { `${ data.commission / 100 }%` }
        </Skeleton>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('common.common.self_bonded') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton loading={ isLoading }>
          { `${ BigNumber(data.self_bonded_amount).div(BigNumber(10 ** config.chain.currency.decimals)).toFormat() } ${ currencyUnits.ether }` }
        </Skeleton>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('common.common.delegated_amount') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton loading={ isLoading }>
          { `${ BigNumber(data.delegated_amount).div(BigNumber(10 ** config.chain.currency.decimals)).toFormat() } ${ currencyUnits.ether }` }
        </Skeleton>
      </ListItemMobileGrid.Value>

    </ListItemMobileGrid.Container>
  );
};

export default React.memo(ValidatorsListItem);
