import { verifiedFetch } from '@helia/verified-fetch';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function useLoadImageViaIpfs() {
  const { t } = useTranslation();
  return React.useCallback(async(url: string) => {
    const response = await verifiedFetch(url);

    if (response.status !== 200) {
      throw new Error(t('shared.common.failed_to_load_image'));
    }

    const blob = await response.blob();
    const src = URL.createObjectURL(blob);
    return src;
  }, [ ]);
}
