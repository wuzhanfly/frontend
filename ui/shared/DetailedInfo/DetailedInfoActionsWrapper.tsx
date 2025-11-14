import React from 'react';
import { useTranslation } from 'react-i18next';

import * as DetailedInfo from './DetailedInfo';

export const TX_ACTIONS_BLOCK_ID = 'tx-actions';

type Props = {
  children: React.ReactNode;
  isLoading?: boolean;
  type: 'tx' | 'user_op';
};

const DetailedInfoActionsWrapper = ({ children, isLoading, type }: Props) => {
  const { t } = useTranslation();
  const [ hasScroll, setHasScroll ] = React.useState(false);

  return (
    <>
      <DetailedInfo.ItemLabel
        id={ TX_ACTIONS_BLOCK_ID }
        hint={t('shared.common.highlighted_events_of_the_type', { type: type === 'tx' ? t('shared.common.transaction') : t('shared.common.user_operation') })}
        isLoading={ isLoading }
        hasScroll={ hasScroll }
      >
        <span>{ `${ type === 'tx' ? t('shared.common.transaction') : t('shared.common.user_operation') } action` }</span>
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValueWithScroll
        gradientHeight={ 48 }
        onScrollVisibilityChange={ setHasScroll }
        alignItems="stretch"
        rowGap={ 5 }
        w="100%"
        maxH="200px"
      >
        { children }
      </DetailedInfo.ItemValueWithScroll>

    </>
  );
};

export default React.memo(DetailedInfoActionsWrapper);
