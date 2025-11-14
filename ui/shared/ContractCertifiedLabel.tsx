import { Flex, chakra } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Tooltip } from 'toolkit/chakra/tooltip';

import IconSvg from './IconSvg';

type Props = {
  iconSize: number;
  className?: string;
};

const ContractCertifiedLabel = ({ iconSize, className }: Props) => {
  const { t } = useTranslation();
  return (
    <Tooltip content={t('shared.common.this_contract_has_been_certifi')}>
      <Flex className={ className }>
        <IconSvg name="certified" color="green.500" boxSize={ iconSize } cursor="pointer"/>
      </Flex>
    </Tooltip>
  );
};

export default chakra(ContractCertifiedLabel);
