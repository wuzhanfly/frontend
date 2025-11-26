import React from 'react';
import { useTranslation } from 'react-i18next';

import { MarketplaceCategory } from 'types/client/marketplace';

import config from 'configs/app';
import { Link } from 'toolkit/chakra/link';
import { apos } from 'toolkit/utils/htmlEntities';
import EmptySearchResultDefault from 'ui/shared/EmptySearchResult';
import IconSvg from 'ui/shared/IconSvg';

const feature = config.features.marketplace;

type Props = {
  favoriteApps: Array<string>;
  selectedCategoryId?: string;
};

const EmptySearchResult = ({ favoriteApps, selectedCategoryId }: Props) => {
  const { t } = useTranslation();
  return (
    <EmptySearchResultDefault
      text={
        (selectedCategoryId === MarketplaceCategory.FAVORITES && !favoriteApps.length) ? (
          <>
            {t('marketplace.empty_search_result.no_favorite_apps')}<br/>
            {t('marketplace.empty_search_result.add_to_favorites')}
            <IconSvg name="heart_outline" boxSize={ 5 } mb={ -1 } color="icon.secondary"/>
          </>
        ) : (
          <>
            {t('marketplace.empty_search_result.no_matching_apps')}
            { 'suggestIdeasFormUrl' in feature && (
              <>
                { ' ' }{t('marketplace.empty_search_result.groundbreaking_idea')}<br/>
                <Link external href={ feature.suggestIdeasFormUrl }>{t('marketplace.empty_search_result.share_with_us')}</Link>
              </>
            ) }
          </>
        )
      }
    />
  );
};

export default React.memo(EmptySearchResult);
