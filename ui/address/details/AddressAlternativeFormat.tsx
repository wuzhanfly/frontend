import React from 'react';
import { useTranslation } from 'react-i18next';

import config from 'configs/app';
import { BECH_32_SEPARATOR, toBech32Address } from 'lib/address/bech32';
import { useSettingsContext } from 'lib/contexts/settings';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';

interface Props {
  isLoading?: boolean;
  addressHash: string;
}

const AddressAlternativeFormat = ({ isLoading, addressHash }: Props) => {
  const { t } = useTranslation();
  const settingsContext = useSettingsContext();

  if (!settingsContext || config.UI.views.address.hashFormat.availableFormats.length < 2) {
    return null;
  }

  const label = settingsContext.addressFormat === 'bech32' ? '0x hash' : `${ config.UI.views.address.hashFormat.bech32Prefix }${ BECH_32_SEPARATOR } hash`;
  const hint = settingsContext.addressFormat === 'bech32' ? t('addresses.common.address_hash_encoded_in_base16') : t('addresses.common.address_hash_encoded_in_bech32');
  const altHash = settingsContext.addressFormat === 'bech32' ? addressHash : toBech32Address(addressHash);

  return (
    <>
      <DetailedInfo.ItemLabel
        hint={ hint }
        isLoading={ isLoading }
      >
        { label }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <AddressEntity
          address={{ hash: altHash }}
          isLoading={ isLoading }
          noIcon
          noLink
          noAltHash
        />
      </DetailedInfo.ItemValue>
    </>
  );
};

export default React.memo(AddressAlternativeFormat);
