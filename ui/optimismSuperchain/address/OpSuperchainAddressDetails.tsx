import React from 'react';
import { useTranslation } from 'react-i18next';

import { route } from 'nextjs/routes';

import multichainConfig from 'configs/multichain';
import getCurrencySymbol from 'lib/multichain/getCurrencySymbol';
import { Link } from 'toolkit/chakra/link';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import DetailedInfoSponsoredItem from 'ui/shared/DetailedInfo/DetailedInfoSponsoredItem';
import TextSeparator from 'ui/shared/TextSeparator';

import ChainIcon from '../components/ChainIcon';

interface Props {
  addressHash: string;
}

const OpSuperchainAddressDetails = ({ addressHash }: Props) => {
  const { t } = useTranslation();
  const chains = multichainConfig()?.chains;

  const isLoading = false;
  const currencySymbol = getCurrencySymbol();

  return (
    <DetailedInfo.Container templateColumns={{ base: 'minmax(0, 1fr)', lg: 'auto minmax(0, 1fr)' }} >
      { chains && chains.length > 0 && (
        <>
          <DetailedInfo.ItemLabel
            hint={t('addresses.common.chains')}
            isLoading={ isLoading }
          >
            { chains && chains.length > 1 ? t('common.common.chains_list') : t('common.common.chain') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue columnGap={ 3 }>
            { chains.map((chain) => (
              <Link
                key={ chain.slug }
                href={ chain.config.app.baseUrl + route({ pathname: '/address/[hash]', query: { hash: addressHash } }) }
                external
                display="flex"
                alignItems="center"
                color="text.primary"
                _hover={{ color: 'link.primary.hover' }}
              >
                <ChainIcon data={ chain } mr={ 2 }/>
                { chain.config.chain.name }
              </Link>
            )) }
          </DetailedInfo.ItemValue>
        </>
      ) }

      <DetailedInfo.ItemLabel
        hint={t('addresses.common.the_name_found_in_the_source_c')}
        isLoading={ isLoading }
      >
        {t('common.common.contract_name')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Link href={ route({ pathname: '/address/[hash]', query: { hash: addressHash, tab: 'contract' } }) }>View by chain</Link>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={ `${ currencySymbol } balance` }
        isLoading={ isLoading }
      >
        { currencySymbol } balance
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        {t('account.common.coming_soon_')}
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={t('addresses.common.all_tokens_in_the_account_and_')}
        isLoading={ isLoading }
      >
        {t('tokens.common.tokens')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        {t('account.common.coming_soon_')}
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={t('addresses.common.number_of_transactions_related')}
        isLoading={ isLoading }
      >
        Transactions
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue whiteSpace="pre-wrap">
        Cross-chain <Link href={ route({ pathname: '/address/[hash]', query: { hash: addressHash, tab: 'txs_cross_chain' } }) }>TBD</Link>
        <TextSeparator color="border.divider"/>
        Local <Link href={ route({ pathname: '/address/[hash]', query: { hash: addressHash, tab: 'txs_local' } }) }>view by chain</Link>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint="Number of transfers to/from this address"
        isLoading={ isLoading }
      >
        Transfers
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue whiteSpace="pre-wrap">
        Cross-chain <Link href={ route({ pathname: '/address/[hash]', query: { hash: addressHash, tab: 'token_transfers_cross_chain' } }) }>TBD</Link>
        <TextSeparator color="border.divider"/>
        Local <Link href={ route({ pathname: '/address/[hash]', query: { hash: addressHash, tab: 'token_transfers_local' } }) }>view by chain</Link>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={t('addresses.common.block_number_in_which_the_addr')}
        isLoading={ isLoading }
      >
        {t('common.common.last_update')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        {t('account.common.coming_soon_')}
      </DetailedInfo.ItemValue>

      <DetailedInfoSponsoredItem isLoading={ isLoading }/>

    </DetailedInfo.Container>
  );
};

export default React.memo(OpSuperchainAddressDetails);
