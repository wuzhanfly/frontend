import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import useApiQuery from 'lib/api/useApiQuery';
import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import useIsMobile from 'lib/hooks/useIsMobile';
import { TX } from 'stubs/tx';
import { Link } from 'toolkit/chakra/link';
import SocketNewItemsNotice from 'ui/shared/SocketNewItemsNotice';
import useNewTxsSocket from 'ui/txs/socket/useTxsSocketTypeAll';

import LatestTxsItem from './LatestTxsItem';
import LatestTxsItemMobile from './LatestTxsItemMobile';

const zetachainFeature = config.features.zetachain;

const LatestTxs = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const txsCount = isMobile ? 2 : 5;
  const { data, isPlaceholderData, isError } = useApiQuery('general:homepage_txs', {
    queryOptions: {
      placeholderData: Array(txsCount).fill(TX),
    },
  });

  const { num, showErrorAlert } = useNewTxsSocket({ type: 'txs_home', isLoading: isPlaceholderData });

  if (isError) {
    return <Text mt={ 4 }>{ t('transactions.common.latest_batches_no_data') }</Text>;
  }

  if (data) {
    const txsUrl = route({ pathname: `/txs`, query: zetachainFeature.isEnabled ? { tab: 'evm' } : undefined });
    return (
      <>
        <SocketNewItemsNotice borderBottomRadius={ 0 } url={ txsUrl } num={ num } showErrorAlert={ showErrorAlert } isLoading={ isPlaceholderData }/>
        <Box mb={ 3 } display={{ base: 'block', lg: 'none' }} textStyle="sm">
          { data.slice(0, txsCount).map(((tx, index) => (
            <LatestTxsItemMobile
              key={ tx.hash + (isPlaceholderData ? index : '') }
              tx={ tx }
              isLoading={ isPlaceholderData }
            />
          ))) }
        </Box>
        <AddressHighlightProvider>
          <Box mb={ 3 } display={{ base: 'none', lg: 'block' }} textStyle="sm">
            { data.slice(0, txsCount).map(((tx, index) => (
              <LatestTxsItem
                key={ tx.hash + (isPlaceholderData ? index : '') }
                tx={ tx }
                isLoading={ isPlaceholderData }
              />
            ))) }
          </Box>
        </AddressHighlightProvider>
        <Flex justifyContent="center">
          <Link textStyle="sm" href={ txsUrl }>{ t('transactions.common.view_all_transactions') }</Link>
        </Flex>
      </>
    );
  }

  return null;
};

export default LatestTxs;
