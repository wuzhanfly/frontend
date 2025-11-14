import { Box, chakra } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Tooltip } from 'toolkit/chakra/tooltip';
import IconSvg from 'ui/shared/IconSvg';

interface Props {
  className?: string;
}

const CodeEditorMainFileIndicator = ({ className }: Props) => {
  const { t } = useTranslation();
  return (
    <Tooltip content={t('shared.common.the_main_file_containing_verif')}>
      <Box className={ className } >
        <IconSvg name="star_filled" boxSize={ 3 } display="block" color="green.500"/>
      </Box>
    </Tooltip>
  );
};

export default chakra(CodeEditorMainFileIndicator);
