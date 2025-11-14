import { Box, HStack, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Tooltip } from 'toolkit/chakra/tooltip';
import IconSvg from 'ui/shared/IconSvg';

const STATUS_TYPES = [ 'pending', 'success', 'failed' ] as const;
export type TContractAutoVerificationStatus = typeof STATUS_TYPES[number];

interface Props {
  status: TContractAutoVerificationStatus;
  mode?: 'inline' | 'tooltip';
}

const ContractAutoVerificationStatus = ({ status, mode = 'inline' }: Props) => {
  const { t } = useTranslation();
  const STATUS_MAP = {
    pending: {
      text: t('addresses.common.checking_contract_verification'),
      leftElement: <Spinner size="sm"/>,
    },
    success: {
      text: t('addresses.common.contract_successfully_verified'),
      leftElement: <IconSvg name="verified_slim" boxSize={ 5 } color="green.500"/>,
    },
    failed: {
      text: t('addresses.common.contract_not_verified_automati'),
      leftElement: <IconSvg name="status/warning" boxSize={ 5 } color="orange.400"/>,
    },
  };

  return (
    <Tooltip content={ STATUS_MAP[status].text } disabled={ mode === 'inline' }>
      <HStack gap={ 2 } whiteSpace="pre-wrap">
        { STATUS_MAP[status].leftElement }
        <Box display={ mode === 'inline' ? 'inline' : 'none' } textStyle="sm">{ STATUS_MAP[status].text }</Box>
      </HStack>
    </Tooltip>
  );
};

export default React.memo(ContractAutoVerificationStatus);
