import { HStack } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { route } from 'nextjs-routes';

import { Link } from 'toolkit/chakra/link';
import { Tag } from 'toolkit/chakra/tag';
import { Tooltip } from 'toolkit/chakra/tooltip';

import type { BlockQuery } from './useBlockQuery';

interface Props {
  blockQuery: BlockQuery;
}

const BlockCeloEpochTagRegular = ({ blockQuery }: Props) => {
  const { t } = useTranslation();
  if (!blockQuery.data?.celo) {
    return null;
  }

  return (
    <Tooltip
      key="epoch-tag-before-finalized"
      content={t('blocks.common.displays_the_epoch_this_block_')}
    >
      <Link href={ route({ pathname: '/epochs/[number]', query: { number: String(blockQuery.data.celo.epoch_number) } }) }>
        <Tag variant="clickable">Epoch #{ blockQuery.data.celo.epoch_number }</Tag>
      </Link>
    </Tooltip>
  );
};

const BlockCeloEpochTag = ({ blockQuery }: Props) => {
  const { t } = useTranslation();
  if (!blockQuery.data?.celo) {
    return null;
  }

  if (!blockQuery.data.celo.l1_era_finalized_epoch_number) {
    return <BlockCeloEpochTagRegular blockQuery={ blockQuery }/>;
  }

  return (
    <HStack gap={ 2 }>
      <Tooltip
        key="epoch-tag"
        content={t('blocks.common.displays_the_epoch_finalized_b')}
      >
        <Link href={ route({ pathname: '/epochs/[number]', query: { number: String(blockQuery.data.celo.l1_era_finalized_epoch_number) } }) }>
          <Tag bgColor="celo" color="blackAlpha.800" variant="clickable"> {t('blocks.common.finalized_epoch')} #{ blockQuery.data.celo.l1_era_finalized_epoch_number } </Tag>
        </Link>
      </Tooltip>
      <BlockCeloEpochTagRegular blockQuery={ blockQuery }/>
    </HStack>
  );
};

export default React.memo(BlockCeloEpochTag);
