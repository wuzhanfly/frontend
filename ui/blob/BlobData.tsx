import { createListCollection, Flex } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import * as blobUtils from 'lib/blob';
import removeNonSignificantZeroBytes from 'lib/blob/removeNonSignificantZeroBytes';
import bytesToBase64 from 'lib/bytesToBase64';
import hexToBase64 from 'lib/hexToBase64';
import hexToBytes from 'lib/hexToBytes';
import hexToUtf8 from 'lib/hexToUtf8';
import { Button } from 'toolkit/chakra/button';
import type { SelectOption } from 'toolkit/chakra/select';
import { Select } from 'toolkit/chakra/select';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { downloadBlob } from 'toolkit/utils/file';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import RawDataSnippet from 'ui/shared/RawDataSnippet';

import BlobDataImage from './BlobDataImage';

const getFormats = (t: (key: string) => string) => [
  { label: t('shared.common.image'), value: 'image' as const },
  { label: t('shared.common.raw'), value: 'raw' as const },
  { label: 'UTF-8', value: 'UTF-8' as const },
  { label: 'Base64', value: 'Base64' as const },
];

type Format = 'image' | 'raw' | 'UTF-8' | 'Base64';

interface Props {
  data: string;
  hash: string;
  isLoading?: boolean;
}

const BlobData = ({ data, isLoading, hash }: Props) => {
  const { t } = useTranslation();
  const FORMATS = getFormats(t);
  const [ format, setFormat ] = React.useState<Array<Format>>([ 'raw' ]);

  const guessedType = React.useMemo(() => {
    if (isLoading) {
      return;
    }
    return blobUtils.guessDataType(data);
  }, [ data, isLoading ]);

  const isImage = guessedType?.mime?.startsWith('image/');
  const collection = React.useMemo(() => {
    const formats = isImage ? getFormats(t) : getFormats(t).filter((format) => format.value !== 'image');
    return createListCollection<SelectOption>({
      items: formats,
    });
  }, [ isImage ]);

  React.useEffect(() => {
    if (isImage) {
      setFormat([ 'image' ]);
    }
  }, [ isImage ]);

  const handleFormatChange = React.useCallback(({ value }: { value: Array<string> }) => {
    setFormat(value as Array<Format>);
  }, []);

  const handleDownloadButtonClick = React.useCallback(() => {
    const fileBlob = (() => {
      switch (format[0]) {
        case 'image': {
          const bytes = hexToBytes(data);
          const filteredBytes = removeNonSignificantZeroBytes(bytes);
          return new Blob([ filteredBytes ], { type: guessedType?.mime });
        }
        case 'UTF-8': {
          return new Blob([ hexToUtf8(data) ], { type: guessedType?.mime ?? 'text/plain' });
        }
        case 'Base64': {
          return new Blob([ hexToBase64(data) ], { type: 'application/octet-stream' });
        }
        case 'raw': {
          return new Blob([ data ], { type: 'application/octet-stream' });
        }
      }
    })();
    const fileName = `blob_${ hash }`;

    if (fileBlob) {
      downloadBlob(fileBlob, fileName);
    }
  }, [ data, format, guessedType, hash ]);

  const content = (() => {
    switch (format[0]) {
      case 'image': {
        if (!guessedType?.mime?.startsWith('image/')) {
          return <RawDataSnippet data={ t('blobs.common.not_an_image') } showCopy={ false } isLoading={ isLoading } w="100%"/>;
        }

        const bytes = hexToBytes(data);
        const filteredBytes = removeNonSignificantZeroBytes(bytes);
        const base64 = bytesToBase64(filteredBytes);

        const imgSrc = `data:${ guessedType.mime };base64,${ base64 }`;

        return <BlobDataImage src={ imgSrc }/>;
      }
      case 'UTF-8':
        return <RawDataSnippet data={ hexToUtf8(data) } showCopy={ false } isLoading={ isLoading } contentProps={{ wordBreak: 'break-word' }} w="100%"/>;
      case 'Base64':
        return <RawDataSnippet data={ hexToBase64(data) } showCopy={ false } isLoading={ isLoading } w="100%"/>;
      case 'raw':
        return <RawDataSnippet data={ data } showCopy={ false } isLoading={ isLoading } w="100%"/>;
      default:
        return <span/>;
    }
  })();

  return (
    <>
      <DetailedInfo.ItemLabel
        hint={ t('blobs.common.blob_data') }
        isLoading={ isLoading }
      >
        {t('blobs.common.blob_data_label')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue flexWrap="wrap">
        <Flex alignItems="center" w="100%" mb={{ base: 1, lg: 3 }} mt={{ base: 1, lg: 0 }}>
          <Select
            collection={ collection }
            placeholder={t('common.common.select_type')}
            value={ format }
            onValueChange={ handleFormatChange }
            w="100px"
            loading={ isLoading }
          />
          <Skeleton ml="auto" mr={ 2 } loading={ isLoading }>
            <Button
                variant="outline"
                size="sm"
                onClick={ handleDownloadButtonClick }
              >
                {t('common.common.download')}
              </Button>
          </Skeleton>
          <CopyToClipboard text={ data } isLoading={ isLoading }/>
        </Flex>
        { content }
      </DetailedInfo.ItemValue>
    </>
  );
};

export default React.memo(BlobData);
