import { Text } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import type { WatchlistAddress } from 'types/api/account';

import useApiFetch from 'lib/api/useApiFetch';
import useIsMobile from 'lib/hooks/useIsMobile';
import DeleteModal from 'ui/shared/DeleteModal';

type Props = {
  open: boolean;
  onOpenChange: ({ open }: { open: boolean }) => void;
  onSuccess: () => Promise<void>;
  data: Pick<WatchlistAddress, 'address_hash' | 'id'>;
};

const DeleteAddressModal: React.FC<Props> = ({ open, onOpenChange, onSuccess, data }) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const apiFetch = useApiFetch();

  const mutationFn = useCallback(() => {
    return apiFetch('general:watchlist', {
      pathParams: { id: String(data.id) },
      fetchParams: { method: 'DELETE' },
    });
  }, [ data?.id, apiFetch ]);

  const address = data?.address_hash;

  const renderModalContent = useCallback(() => {
    const addressString = isMobile ? [ address.slice(0, 4), address.slice(-4) ].join('...') : address;
    return (
      <Text>Address <Text fontWeight="700" as="span"> { addressString || 'address' }</Text> will be deleted</Text>
    );
  }, [ address, isMobile ]);

  return (
    <DeleteModal
      open={ open }
      onOpenChange={ onOpenChange }
      title={t('watchlist.common.remove_address_from_watch_list')}
      renderContent={ renderModalContent }
      mutationFn={ mutationFn }
      onSuccess={ onSuccess }
    />
  );
};

export default DeleteAddressModal;
