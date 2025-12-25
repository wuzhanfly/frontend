import React from 'react';
import { useTranslation } from 'react-i18next';

import type { MethodType } from './types';

import { ContentLoader } from 'toolkit/components/loaders/ContentLoader';
import DataFetchAlert from 'ui/shared/DataFetchAlert';

interface Props {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  type: MethodType;
  children: React.JSX.Element;
}

const ContractMethodsContainer = ({ isLoading, isError, isEmpty, type, children }: Props) => {
  const { t } = useTranslation();

  if (isLoading) {
    return <ContentLoader w="fit-content"/>;
  }

  if (isError) {
    return <DataFetchAlert/>;
  }

  if (isEmpty) {
    const typeText = type === 'all' ? '' : type;
    return <span>{ t('addresses.common.no_public_functions_found', { type: typeText }) }</span>;
  }

  return children;
};

export default React.memo(ContractMethodsContainer);
