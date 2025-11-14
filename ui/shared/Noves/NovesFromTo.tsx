import { Box } from '@chakra-ui/react';
import type { FC } from 'react';
import React from 'react';

import type { NovesResponseData } from 'types/api/noves';

import { Badge } from 'toolkit/chakra/badge';
import { Skeleton } from 'toolkit/chakra/skeleton';
import type { NovesFlowViewItem } from 'ui/tx/assetFlows/utils/generateFlowViewData';
import { useTranslation } from 'react-i18next';

import AddressEntity from '../entities/address/AddressEntity';
import { getActionFromTo, getFromTo } from './utils';

interface Props {
  isLoaded: boolean;
  txData?: NovesResponseData;
  currentAddress?: string;
  item?: NovesFlowViewItem;
}

const NovesFromTo: FC<Props> = ({ isLoaded, txData, currentAddress = '', item }) => {
  const { t } = useTranslation();

  const data = React.useMemo(() => {
    if (txData) {
      return getFromTo(txData, currentAddress, t);
    }
    if (item) {
      return getActionFromTo(item, t);
    }

    return { text: t('shared.common.sent_to'), address: '' };
  }, [ currentAddress, item, txData, t ]);

  const isSent = data.text.startsWith(t('transactions.common.sent'));

  const address = { hash: data.address || '', name: data.name || '' };

  return (
    <Skeleton borderRadius="sm" loading={ !isLoaded }>
      <Box display="flex">
        <Badge
          colorPalette={ isSent ? 'yellow' : 'green' }
          px={ 0 }
          w="113px"
          flexShrink={ 0 }
          justifyContent="center"
        >
          { data.text }
        </Badge>

        <AddressEntity
          address={ address }
          fontWeight="500"
          noCopy={ !data.address }
          noLink={ !data.address }
          noIcon={ address.name === t('transactions.common.validators') }
          ml={ 2 }
          truncation="dynamic"
        />
      </Box>
    </Skeleton>
  );
};

export default NovesFromTo;
