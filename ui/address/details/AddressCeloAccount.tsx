import BigNumber from 'bignumber.js';
import { upperFirst } from 'es-toolkit';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { Address } from 'types/api/address';
import type { ExcludeNull, ExcludeUndefined } from 'types/utils';

import config from 'configs/app';
import { currencyUnits } from 'lib/units';
import { Link } from 'toolkit/chakra/link';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import * as DetailedInfoItemBreakdown from 'ui/shared/DetailedInfo/DetailedInfoItemBreakdown';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import TruncatedValue from 'ui/shared/TruncatedValue';

interface Props {
  isLoading?: boolean;
  data: ExcludeNull<ExcludeUndefined<Address['celo']>['account']>;
}

const AddressCeloAccount = ({ isLoading, data }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <DetailedInfo.ItemLabel
        hint="Celo account info (from the Accounts contract), including it's human-readable name"
        isLoading={ isLoading }
      >
        Celo account
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue multiRow>
        { data.name && <TruncatedValue value={ data.name } mr={ 3 }/> }
        <DetailedInfoItemBreakdown.Container loading={ isLoading }>
          <DetailedInfoItemBreakdown.Row
            label="Type"
            hint="The role of the account: regular, validator, or validator group"
          >
            { upperFirst(data.type) }
          </DetailedInfoItemBreakdown.Row>

          { data.metadata_url && (
            <DetailedInfoItemBreakdown.Row
              label={ t('addresses.common.metadata_url') }
              hint={ t('addresses.common.link_to_additional_information') }
            >
              <Link href={ data.metadata_url } external>
                <TruncatedValue value={ data.metadata_url }/>
              </Link>
            </DetailedInfoItemBreakdown.Row>
          ) }

          <DetailedInfoItemBreakdown.Row
            label={ `Locked ${ currencyUnits.ether }` }
            hint="Total amount of CELO locked by this account (used for staking or governance)"
          >
            <TruncatedValue value={ BigNumber(data.locked_celo).div(10 ** config.chain.currency.decimals).toFormat() }/>
          </DetailedInfoItemBreakdown.Row>

          <DetailedInfoItemBreakdown.Row
            label={ `Non-voting locked ${ currencyUnits.ether }` }
            hint="Portion of locked CELO that is not currently used for voting"
          >
            <TruncatedValue value={ BigNumber(data.nonvoting_locked_celo).div(10 ** config.chain.currency.decimals).toFormat() }/>
          </DetailedInfoItemBreakdown.Row>

          { data.vote_signer_address && (
            <DetailedInfoItemBreakdown.Row
              label={ t('addresses.common.vote_signer_address') }
              hint={ t('addresses.common.address_authorized_to_vote_in_') }
            >
              <AddressEntity address={ data.vote_signer_address }/>
            </DetailedInfoItemBreakdown.Row>
          ) }

          { data.validator_signer_address && (
            <DetailedInfoItemBreakdown.Row
              label={ t('addresses.common.validator_signer_address') }
              hint="Address authorized to manage a validator or validator group and sign consensus messages for this account"
            >
              <AddressEntity address={ data.validator_signer_address }/>
            </DetailedInfoItemBreakdown.Row>
          ) }

          { data.attestation_signer_address && (
            <DetailedInfoItemBreakdown.Row
              label={ t('addresses.common.attestation_signer_address') }
              hint={ t('addresses.common.address_whose_key_this_account') }
            >
              <AddressEntity address={ data.attestation_signer_address }/>
            </DetailedInfoItemBreakdown.Row>
          ) }
        </DetailedInfoItemBreakdown.Container>
      </DetailedInfo.ItemValue>
    </>
  );
};

export default React.memo(AddressCeloAccount);
