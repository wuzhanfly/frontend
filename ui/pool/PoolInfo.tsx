import React from 'react';
import { useTranslation } from 'react-i18next';

import type { Pool } from 'types/api/pools';

import { Skeleton } from 'toolkit/chakra/skeleton';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import DetailedInfoSponsoredItem from 'ui/shared/DetailedInfo/DetailedInfoSponsoredItem';
import TokenEntity from 'ui/shared/entities/token/TokenEntity';

type Props = {
  data: Pool;
  isPlaceholderData: boolean;
};

const PoolInfo = ({ data, isPlaceholderData }: Props) => {
  const { t } = useTranslation();
  return (
    <DetailedInfo.Container>
      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
        hint={t('pools.common.the_base_token_in_a_liquidity_')}
      >
        {t('pool.info.base_token')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <TokenEntity
          token={{
            type: 'ERC-20',
            address_hash: data.base_token_address,
            name: data.base_token_symbol,
            symbol: data.base_token_symbol,
            icon_url: data.base_token_icon_url,
            reputation: null,
          }}
          isLoading={ isPlaceholderData }
        />
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
        hint={t('pools.common.the_quote_token_in_a_liquidity')}
      >
        {t('pool.info.quote_token')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <TokenEntity
          token={{
            type: 'ERC-20',
            address_hash: data.quote_token_address,
            name: data.quote_token_symbol,
            symbol: data.quote_token_symbol,
            icon_url: data.quote_token_icon_url,
            reputation: null,
          }}
          isLoading={ isPlaceholderData }
        />
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
        hint={t('pool.info.fully_diluted_valuation_description')}
      >
        {t('pool.info.base_token_fdv')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isPlaceholderData }>
          { data.base_token_fully_diluted_valuation_usd ?
            `${ Number(data.base_token_fully_diluted_valuation_usd).toLocaleString(undefined, { maximumFractionDigits: 2, notation: 'compact' }) }` :
            t('pool.info.na')
          }
        </Skeleton>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
        hint={t('pools.common.current_market_capitalization_')}
      >
        {t('pool.info.base_token_market_cap')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isPlaceholderData }>
          { data.base_token_market_cap_usd ?
            `${ Number(data.base_token_market_cap_usd).toLocaleString(undefined, { maximumFractionDigits: 2, notation: 'compact' }) }` :
            t('pool.info.na')
          }
        </Skeleton>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
        hint={t('pool.info.fully_diluted_valuation_description')}
      >
        {t('pool.info.quote_token_fdv')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isPlaceholderData }>
          { data.quote_token_fully_diluted_valuation_usd ?
            `${ Number(data.quote_token_fully_diluted_valuation_usd).toLocaleString(undefined, { maximumFractionDigits: 2, notation: 'compact' }) }` :
            t('pool.info.na_quote')
          }
        </Skeleton>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
        hint={t('pools.common.current_market_capitalization_')}
      >
        {t('pool.info.quote_token_market_cap')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isPlaceholderData }>
          { data.quote_token_market_cap_usd ?
            `${ Number(data.quote_token_market_cap_usd).toLocaleString(undefined, { maximumFractionDigits: 2, notation: 'compact' }) }` :
            t('pool.info.na_quote')
          }
        </Skeleton>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
        hint={t('pools.common.current_liquidity_of_the_pool')}
      >
        {t('pool.info.liquidity')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isPlaceholderData }>
          ${ Number(data.liquidity).toLocaleString(undefined, { maximumFractionDigits: 2, notation: 'compact' }) }
        </Skeleton>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
        hint={t('pools.common.dex_where_the_pool_is_traded')}
      >
        {t('pool.info.dex')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isPlaceholderData }>
          { data.dex.name }
        </Skeleton>
      </DetailedInfo.ItemValue>

      <DetailedInfoSponsoredItem isLoading={ isPlaceholderData }/>
    </DetailedInfo.Container>
  );
};

export default PoolInfo;
