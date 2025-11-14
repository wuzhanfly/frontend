import { Box, Flex, chakra, createListCollection } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { TokenInstance } from 'types/api/token';

import { Alert } from 'toolkit/chakra/alert';
import type { SelectOption } from 'toolkit/chakra/select';
import { Select } from 'toolkit/chakra/select';
import { ContentLoader } from 'toolkit/components/loaders/ContentLoader';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import RawDataSnippet from 'ui/shared/RawDataSnippet';

import { useMetadataUpdateContext } from './contexts/metadataUpdate';
import MetadataAccordion from './metadata/MetadataAccordion';



type Format = 'table' | 'JSON';

interface Props {
  data: TokenInstance['metadata'] | undefined;
  isPlaceholderData?: boolean;
}

const TokenInstanceMetadata = ({ data, isPlaceholderData }: Props) => {
  const { t } = useTranslation();
  const OPTIONS = React.useMemo(() => [
    { label: t('common.common.table'), value: 'table' as const },
    { label: 'JSON', value: 'JSON' as const },
  ], [t]);
  
  const collection = React.useMemo(() => createListCollection<SelectOption>({ items: OPTIONS }), [t]);
  const [ format, setFormat ] = React.useState<Array<Format>>([ 'table' ]);

  const { status: refetchStatus } = useMetadataUpdateContext() || {};

  const handleValueChange = React.useCallback(({ value }: { value: Array<string> }) => {
    setFormat(value as Array<Format>);
  }, []);

  if (isPlaceholderData || refetchStatus === 'WAITING_FOR_RESPONSE') {
    return <ContentLoader/>;
  }

  if (!data) {
    return <Box>There is no metadata for this NFT</Box>;
  }

  const content = format[0] === t('common.common.table') ?
    <MetadataAccordion data={ data }/> :
    <RawDataSnippet data={ JSON.stringify(data, undefined, 4) } showCopy={ false }/>;

  return (
    <Box>
      { refetchStatus === 'ERROR' && (
        <Alert status="warning" mb={ 6 } title={t('common.common.ooops')} display={{ base: 'block', lg: 'flex' }}>
          <span>We { t('common.common.couldnt') } refresh metadata. Please try again now or later.</span>
        </Alert>
      ) }
      <Flex alignItems="center" mb={ 6 }>
        <chakra.span fontWeight={ 500 }>Metadata</chakra.span>
        <Select
          collection={ collection }
          placeholder="Select type"
          value={ format }
          onValueChange={ handleValueChange }
          ml={ 5 }
          w="100px"
        />
        { format[0] === 'JSON' && <CopyToClipboard text={ JSON.stringify(data) } ml="auto"/> }
      </Flex>
      { content }
    </Box>
  );
};

export default React.memo(TokenInstanceMetadata);
