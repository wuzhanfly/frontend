import { chakra } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { TokenInfoApplication } from 'types/api/account';

interface Props {
  status?: TokenInfoApplication['status'];
}

const VerifiedAddressesStatus = ({ status }: Props) => {
  const { t } = useTranslation();
  switch (status) {
    case 'IN_PROCESS': {
      return <chakra.span fontWeight={ 500 }>{ t('verified_addresses.status.in_progress') }</chakra.span>;
    }
    case 'APPROVED': {
      return <chakra.span fontWeight={ 500 } color="green.500">{ t('verified_addresses.status.approved') }</chakra.span>;
    }
    case 'UPDATE_REQUIRED': {
      return <chakra.span fontWeight={ 500 } color="orange.500">{ t('verified_addresses.status.waiting_for_update') }</chakra.span>;
    }
    case 'REJECTED': {
      return <chakra.span fontWeight={ 500 } color="red.500">{ t('verified_addresses.status.rejected') }</chakra.span>;
    }

    default:
      return null;
  }
};

export default VerifiedAddressesStatus;
