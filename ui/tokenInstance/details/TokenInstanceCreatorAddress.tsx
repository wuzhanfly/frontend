import React from 'react';
import { useTranslation } from 'react-i18next';

import useApiQuery from 'lib/api/useApiQuery';
import { ADDRESS_INFO } from 'stubs/address';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';

interface Props {
  hash: string;
}

const TokenInstanceCreatorAddress = ({ hash }: Props) => {
  const { t } = useTranslation();
  const addressQuery = useApiQuery('general:address', {
    pathParams: { hash },
    queryOptions: {
      enabled: Boolean(hash),
      placeholderData: ADDRESS_INFO,
    },
  });

  if (addressQuery.isError) {
    return null;
  }

  if (!addressQuery.data?.creator_address_hash) {
    return null;
  }

  const creatorAddress = {
    hash: addressQuery.data.creator_address_hash,
    filecoin: {
      robust: addressQuery.data.creator_filecoin_robust_address,
    },
    is_contract: false,
    implementations: null,
  };

  return (
    <>
      <DetailedInfo.ItemLabel
        hint={t('common.common.address_that_deployed_this_tok')}
        isLoading={ addressQuery.isPlaceholderData }
      >
        { t('tokens.instance.creator') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <AddressEntity
          address={ creatorAddress }
          isLoading={ addressQuery.isPlaceholderData }
        />
      </DetailedInfo.ItemValue>
    </>
  );
};

export default TokenInstanceCreatorAddress;
