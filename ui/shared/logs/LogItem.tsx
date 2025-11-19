import { chakra, Box, Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import React from 'react';

import type { Log } from 'types/api/log';
import type { ChainConfig } from 'types/multichain';

import { route } from 'nextjs-routes';

// import searchIcon from 'icons/search.svg';
import { Alert } from 'toolkit/chakra/alert';
import { Link } from 'toolkit/chakra/link';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { space } from 'toolkit/utils/htmlEntities';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import LogDecodedInputData from 'ui/shared/logs/LogDecodedInputData';
import LogTopic from 'ui/shared/logs/LogTopic';
import type { DataType } from 'ui/shared/RawInputData';
import RawInputData from 'ui/shared/RawInputData';

import LogIndex from './LogIndex';

type Props = Log & {
  type: 'address' | 'transaction';
  isLoading?: boolean;
  defaultDataType?: DataType;
  chainData?: ChainConfig;
};

const RowHeader = ({ children, isLoading }: { children: React.ReactNode; isLoading?: boolean }) => (
  <GridItem _notFirst={{ my: { base: 4, lg: 0 } }}>
    <Skeleton fontWeight={ 500 } loading={ isLoading } display="inline-block">{ children }</Skeleton>
  </GridItem>
);

const LogItem = ({ data, isLoading, type, address, transaction_hash, index, decoded, topics, defaultDataType, chainData }: Props) => {
  const { t } = useTranslation();

  const hasTxInfo = type === 'address' && transaction_hash;

  return (
    <Grid
      gridTemplateColumns={{ base: 'minmax(0, 1fr)', lg: '200px minmax(0, 1fr)' }}
      gap={{ base: 2, lg: 8 }}
      py={ 8 }
      _notFirst={{
        borderTopWidth: '1px',
        borderTopColor: { _light: 'blackAlpha.200', _dark: 'whiteAlpha.200' },
      }}
      _first={{
        pt: 0,
      }}
    >
      { !decoded && !address.is_verified && type === 'transaction' && (
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <Alert status="warning" display="inline-table" whiteSpace="normal">
            {t('transactions.common.to_see_accurate_decoded_input_data')} { space }
            <Link href={ route({ pathname: '/address/[hash]/contract-verification', query: { hash: address.hash } }) }>{t('common.common.verify_the_contract_here')}</Link>
          </Alert>
        </GridItem>
      ) }
      { hasTxInfo ? <RowHeader isLoading={ isLoading }>{t('transactions.common.transaction')}</RowHeader> : <RowHeader isLoading={ isLoading }>{t('addresses.common.address')}</RowHeader> }
      <GridItem display="flex" alignItems="center">
        { type === 'address' && transaction_hash ? (
          <TxEntity
            hash={ transaction_hash }
            isLoading={ isLoading }
            mr={{ base: 9, lg: 4 }}
            w="100%"
            chain={ chainData }
            noCopy
          />
        ) : (
          <AddressEntity
            address={ address }
            isLoading={ isLoading }
            mr={{ base: 9, lg: 4 }}
            w="100%"
          />
        ) }
        { /* api doesn't have find topic feature yet */ }
        { /* <Tooltip label="Find matches topic">
          <Link ml={ 2 } mr={{ base: 9, lg: 0 }} display="inline-flex">
            <Icon as={ searchIcon } boxSize={ 5 }/>
          </Link>
        </Tooltip> */ }
        <LogIndex
          isLoading={ isLoading }
          textStyle="sm"
          ml="auto"
          minW={ 8 }
          height={ 8 }
        >
          { index }
        </LogIndex>
      </GridItem>
      { decoded && (
        <>
          <RowHeader isLoading={ isLoading }>{t('common.common.decode_input_data')}</RowHeader>
          <GridItem>
            <LogDecodedInputData data={ decoded } isLoading={ isLoading }/>
          </GridItem>
        </>
      ) }
      <RowHeader isLoading={ isLoading }>{t('common.common.topics')}</RowHeader>
      <GridItem>
        { topics.filter(Boolean).map((item, index) => (
          <LogTopic
            key={ index }
            hex={ item }
            index={ index }
            isLoading={ isLoading }
          />
        )) }
      </GridItem>
      <RowHeader isLoading={ isLoading }>{t('common.common.data')}</RowHeader>
      { defaultDataType ? (
        <RawInputData hex={ data } isLoading={ isLoading } defaultDataType={ defaultDataType } minHeight="53px"/>
      ) : (
        <Skeleton
          loading={ isLoading }
          p={ 4 }
          fontSize="sm"
          borderRadius="md"
          bgColor={ isLoading ? undefined : { _light: 'blackAlpha.50', _dark: 'whiteAlpha.50' } }
        >
          { data }
        </Skeleton>
      ) }
    </Grid>
  );
};

export default React.memo(LogItem);
