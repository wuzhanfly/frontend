import React from 'react';
import { useTranslation } from 'react-i18next';

import type { Address } from 'types/api/address';

import { Skeleton } from 'toolkit/chakra/skeleton';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import TokenEntity from 'ui/shared/entities/token/TokenEntity';

interface Props {
  data: Pick<Address, 'name' | 'token' | 'is_contract'>;
  isLoading?: boolean;
}

const AddressNameInfo = ({ data, isLoading }: Props) => {
  const { t } = useTranslation();
  if (data.token) {
    return (
      <>
        <DetailedInfo.ItemLabel
          hint={ t('addresses.common.token_name_and_symbol') }
          isLoading={ isLoading }
        >
          { t('addresses.common.token_name') }
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          <TokenEntity
            token={ data.token }
            isLoading={ isLoading }
            noIcon
            noCopy
          />
        </DetailedInfo.ItemValue>
      </>
    );
  }

  if (data.is_contract && data.name) {
    return (
      <>
        <DetailedInfo.ItemLabel
          hint={ t('addresses.common.the_name_found_in_the_source_c') }
          isLoading={ isLoading }
        >
          { t('addresses.common.contract_name') }
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          <Skeleton loading={ isLoading }>
            { data.name }
          </Skeleton>
        </DetailedInfo.ItemValue>
      </>
    );
  }

  if (data.name) {
    return (
      <>
        <DetailedInfo.ItemLabel
          hint={ t('addresses.common.the_name_of_the_validator') }
          isLoading={ isLoading }
        >
          { t('addresses.common.validator_name') }
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          <Skeleton loading={ isLoading }>
            { data.name }
          </Skeleton>
        </DetailedInfo.ItemValue>
      </>
    );
  }

  return null;
};

export default React.memo(AddressNameInfo);
