import { Flex } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';

import * as bens from '@blockscout/bens-types';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import type { ResourceError } from 'lib/api/resources';
import dayjs from 'lib/date/dayjs';
import { Link } from 'toolkit/chakra/link';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { Tooltip } from 'toolkit/chakra/tooltip';
import { stripTrailingSlash } from 'toolkit/utils/url';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import NftEntity from 'ui/shared/entities/nft/NftEntity';
import IconSvg from 'ui/shared/IconSvg';
import TextSeparator from 'ui/shared/TextSeparator';

import NameDomainDetailsAlert from './details/NameDomainDetailsAlert';
import NameDomainExpiryStatus from './NameDomainExpiryStatus';

interface Props {
  query: UseQueryResult<bens.DetailedDomain, ResourceError<unknown>>;
}

const NameDomainDetails = ({ query }: Props) => {
  const { t } = useTranslation();
  const isLoading = query.isPlaceholderData;

  const otherAddresses = Object.entries(query.data?.other_addresses ?? {});
  const hasExpired = query.data?.expiry_date && dayjs(query.data.expiry_date).isBefore(dayjs());

  return (
    <>
      <NameDomainDetailsAlert data={ query.data }/>
      <DetailedInfo.Container>
        { query.data?.registration_date && (
          <>
            <DetailedInfo.ItemLabel
              hint={t('common.common.the_date_the_name_was_register')}
              isLoading={ isLoading }
            >
              Registration date
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <IconSvg name="clock" boxSize={ 5 } color="icon.primary" verticalAlign="middle" isLoading={ isLoading } mr={ 2 }/>
              <Skeleton loading={ isLoading } display="inline" whiteSpace="pre-wrap" lineHeight="20px">
                { dayjs(query.data.registration_date).format('llll') }
              </Skeleton>
            </DetailedInfo.ItemValue>
          </>
        ) }

        { query.data?.expiry_date && (
          <>
            <DetailedInfo.ItemLabel
            // eslint-disable-next-line max-len
              hint={t('name_service.common.the_date_the_name_expires_upon_which_there_is_a_grace_period_for_the_owner_to_renew_after_grace_period_ends_the_name_is_released_to_the_market')}
              isLoading={ isLoading }
            >
              Expiration date
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <IconSvg name="clock" boxSize={ 5 } color="icon.primary" verticalAlign="middle" isLoading={ isLoading } mr={ 2 } mt="-2px"/>
              { hasExpired && (
                <>
                  <Skeleton loading={ isLoading } display="inline" whiteSpace="pre-wrap" lineHeight="24px">
                    { dayjs(query.data.expiry_date).fromNow() }
                  </Skeleton>
                  <TextSeparator/>
                </>
              ) }
              <Skeleton loading={ isLoading } display="inline" whiteSpace="pre-wrap" lineHeight="24px">
                { dayjs(query.data.expiry_date).format('llll') }
              </Skeleton>
              <TextSeparator/>
              <Skeleton loading={ isLoading } color="text.secondary" display="inline">
                <NameDomainExpiryStatus date={ query.data?.expiry_date }/>
              </Skeleton>
            </DetailedInfo.ItemValue>
          </>
        ) }

        { query.data?.resolver_address && (
          <>
            <DetailedInfo.ItemLabel
              hint={t('common.common.the_resolver_contract_provides')}
              isLoading={ isLoading }
            >
              Resolver
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue
            >
              <AddressEntity
                address={ query.data.resolver_address }
                isLoading={ isLoading }
              />
            </DetailedInfo.ItemValue>
          </>
        ) }

        { query.data?.registrant && (
          <>
            <DetailedInfo.ItemLabel
              hint={t('common.common.the_account_that_owns_the_doma')}
              isLoading={ isLoading }
            >
              Registrant
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue
              columnGap={ 2 }
              flexWrap="nowrap"
            >
              <AddressEntity
                address={ query.data.registrant }
                isLoading={ isLoading }
              />
              <Tooltip content="Lookup for related domain names">
                <Link
                  flexShrink={ 0 }
                  display="inline-flex"
                  href={ route({
                    pathname: '/name-services',
                    query: { tab: 'domains', owned_by: 'true', resolved_to: 'true', address: query.data.registrant.hash },
                  }) }
                >
                  <IconSvg name="search" boxSize={ 5 } isLoading={ isLoading }/>
                </Link>
              </Tooltip>
            </DetailedInfo.ItemValue>
          </>
        ) }

        { query.data?.owner && (
          <>
            <DetailedInfo.ItemLabel
              hint={t('common.common.the_account_that_owns_the_righ')}
              isLoading={ isLoading }
            >
              Owner
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue
              columnGap={ 2 }
              flexWrap="nowrap"
            >
              <AddressEntity
                address={ query.data.owner }
                isLoading={ isLoading }
              />
              <Tooltip content="Lookup for related domain names">
                <Link
                  flexShrink={ 0 }
                  display="inline-flex"
                  href={ route({
                    pathname: '/name-services',
                    query: { tab: 'domains', owned_by: 'true', resolved_to: 'true', address: query.data.owner.hash },
                  }) }
                >
                  <IconSvg name="search" boxSize={ 5 } isLoading={ isLoading }/>
                </Link>
              </Tooltip>
            </DetailedInfo.ItemValue>
          </>
        ) }

        { query.data?.wrapped_owner && (
          <>
            <DetailedInfo.ItemLabel
              hint={t('common.common.owner_of_this_nft_domain_in_na')}
              isLoading={ isLoading }
            >
              Manager
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue
              columnGap={ 2 }
              flexWrap="nowrap"
            >
              <AddressEntity
                address={ query.data.wrapped_owner }
                isLoading={ isLoading }
              />
              <Tooltip content="Lookup for related domain names">
                <Link
                  flexShrink={ 0 }
                  display="inline-flex"
                  href={ route({
                    pathname: '/name-services',
                    query: { tab: 'domains', owned_by: 'true', resolved_to: 'true', address: query.data.wrapped_owner.hash },
                  }) }
                >
                  <IconSvg name="search" boxSize={ 5 } isLoading={ isLoading }/>
                </Link>
              </Tooltip>
            </DetailedInfo.ItemValue>
          </>
        ) }

        { query.data?.tokens.map((token) => {
          const isProtocolBaseChain = stripTrailingSlash(query.data.protocol?.deployment_blockscout_base_url ?? '') === config.app.baseUrl;
          const entityProps = {
            link: { external: !isProtocolBaseChain ? true : false },
            href: !isProtocolBaseChain ? (
              stripTrailingSlash(query.data.protocol?.deployment_blockscout_base_url ?? '') +
            route({ pathname: '/token/[hash]/instance/[id]', query: { hash: token.contract_hash, id: token.id } })
            ) : undefined,
          };

          return (
            <React.Fragment key={ token.type }>
              <DetailedInfo.ItemLabel
                hint={t('name_service.common.the_token_id_of_this_domain_name_nft', { tokenType: token.type === bens.TokenType.WRAPPED_DOMAIN_TOKEN ? t('name_service.common.wrapped') : '' })}
                isLoading={ isLoading }
              >
                { token.type === bens.TokenType.WRAPPED_DOMAIN_TOKEN ? 'Wrapped token ID' : t('transactions.common.token_id') }
              </DetailedInfo.ItemLabel>
              <DetailedInfo.ItemValue
                wordBreak="break-all"
                whiteSpace="pre-wrap"
              >
                <NftEntity { ...entityProps } hash={ token.contract_hash } id={ token.id } isLoading={ isLoading } noIcon/>
              </DetailedInfo.ItemValue>
            </React.Fragment>
          );
        }) }

        { otherAddresses.length > 0 && (
          <>
            <DetailedInfo.ItemLabel
              hint={t('common.common.other_cryptocurrency_addresses')}
              isLoading={ isLoading }
            >
              Other addresses
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue
              flexDir="column"
              alignItems="flex-start"
            >
              { otherAddresses.map(([ type, address ]) => (
                <Flex key={ type } columnGap={ 2 } minW="0" w="100%" overflow="hidden">
                  <Skeleton loading={ isLoading }>{ type }</Skeleton>
                  <AddressEntity
                    address={{ hash: address }}
                    isLoading={ isLoading }
                    noLink
                    noIcon
                  />
                </Flex>
              )) }
            </DetailedInfo.ItemValue>
          </>
        ) }
      </DetailedInfo.Container>
    </>
  );
};

export default React.memo(NameDomainDetails);
