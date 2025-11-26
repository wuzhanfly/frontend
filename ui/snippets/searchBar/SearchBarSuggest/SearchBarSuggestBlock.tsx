import { Text, Flex, Grid } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ItemsProps } from './types';
import type { SearchResultBlock } from 'types/client/search';

import dayjs from 'lib/date/dayjs';
import highlightText from 'lib/highlightText';
import { Tag } from 'toolkit/chakra/tag';
import * as BlockEntity from 'ui/shared/entities/block/BlockEntity';
import HashStringShortenDynamic from 'ui/shared/HashStringShortenDynamic';

const SearchBarSuggestBlock = ({ data, isMobile, searchTerm }: ItemsProps<SearchResultBlock>) => {
  const { t } = useTranslation();
  const icon = <BlockEntity.Icon/>;
  const shouldHighlightHash = data.block_hash.toLowerCase() === searchTerm.toLowerCase();
  const isFutureBlock = data.timestamp === undefined;

  const blockNumber = (
    <Text
      fontWeight={ 700 }
      overflow="hidden"
      whiteSpace="nowrap"
      textOverflow="ellipsis"
    >
      <span dangerouslySetInnerHTML={{ __html: highlightText(data.block_number.toString(), searchTerm) }}/>
    </Text>
  );
  const hash = !isFutureBlock ? (
    <Text
      color="text.secondary"
      overflow="hidden"
      whiteSpace="nowrap"
      as={ shouldHighlightHash ? 'mark' : 'span' }
      display="block"
    >
      <HashStringShortenDynamic hash={ data.block_hash } noTooltip/>
    </Text>
  ) : null;
  const date = !isFutureBlock ? dayjs(data.timestamp).format('llll') : undefined;
  const futureBlockText = <Text color="text.secondary">Learn estimated time for this block to be created.</Text>;

  if (isMobile) {
    return (
      <>
        <Flex alignItems="center">
          { icon }
          { blockNumber }
          { data.block_type === 'reorg' && <Tag ml="auto">{t('snippets.search_bar_block.reorg')}</Tag> }
          { data.block_type === 'uncle' && <Tag ml="auto">{t('snippets.search_bar_block.uncle')}</Tag> }
        </Flex>
        { hash }
        { isFutureBlock ? futureBlockText : <Text color="text.secondary">{ date }</Text> }
      </>
    );
  }

  return (
    <Grid templateColumns="228px minmax(auto, max-content) auto" gap={ 2 }>
      <Flex alignItems="center">
        { icon }
        { blockNumber }
      </Flex>
      <Flex columnGap={ 3 } minW={ 0 } alignItems="center">
        { data.block_type === 'reorg' && <Tag flexShrink={ 0 }>{t('snippets.search_bar_block.reorg')}</Tag> }
        { data.block_type === 'uncle' && <Tag flexShrink={ 0 }>{t('snippets.search_bar_block.uncle')}</Tag> }
        { isFutureBlock ? futureBlockText : hash }
      </Flex>
      { date && <Text color="text.secondary" textAlign="end">{ date }</Text> }
    </Grid>
  );
};

export default React.memo(SearchBarSuggestBlock);
