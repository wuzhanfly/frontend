import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import React from 'react';

import config from 'configs/app';
import type { ExternalSearchItem as ExternalSearchItemType } from 'lib/search/externalSearch';
import { Link } from 'toolkit/chakra/link';

const zetaChainFeature = config.features.zetachain;

function getIndefiniteArticle(phrase: string): 'a' | 'an' {
  const trimmed = (phrase || '').trim().toLowerCase();
  if (!trimmed) return 'a';

  return 'aeiou'.includes(trimmed[0]) ? 'an' : 'a';
}

interface Props {
  item: ExternalSearchItemType;
}

const ExternalSearchItem = ({ item }: Props) => {
  const { t } = useTranslation();
  
  if (!zetaChainFeature.isEnabled || !item) {
    return null;
  }

  const url = item.url;

  return (
    <>
      <Text color="text.secondary">
        {t('common.external_search.it_looks_like_you_are_searching_for', { article: getIndefiniteArticle(item.name), name: item.name })}
      </Text>
      <Link href={ url } external mt={ 4 }>
        {t('common.external_search.click_here_to_be_redirected')}
      </Link>
    </>
  );
};

export default React.memo(ExternalSearchItem);
