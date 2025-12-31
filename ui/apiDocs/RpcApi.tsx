import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from 'toolkit/chakra/link';

const RpcApi = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Text>
        { t('api_docs.rpc.description') }
      </Text>
      <Link href="https://docs.blockscout.com/devs/apis/rpc" external mt={ 6 }>{ t('api_docs.rpc.view_modules') }</Link>
    </Box>
  );
};

export default React.memo(RpcApi);
