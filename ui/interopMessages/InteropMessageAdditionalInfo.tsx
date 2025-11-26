import { chakra, Text, Flex } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { InteropMessage } from 'types/api/interop';

import { PopoverBody, PopoverCloseTriggerWrapper, PopoverContent, PopoverRoot, PopoverTrigger } from 'toolkit/chakra/popover';
import AdditionalInfoButton from 'ui/shared/AdditionalInfoButton';
import CopyToClipboard from 'ui/shared/CopyToClipboard';

type Props = {
  payload: InteropMessage['payload'];
  isLoading?: boolean;
  className?: string;
};

const InteropMessageAdditionalInfo = ({ payload, isLoading, className }: Props) => {
  const { t } = useTranslation();
  return (
    <PopoverRoot positioning={{ placement: 'right-start' }}>
      <PopoverTrigger>
        <AdditionalInfoButton loading={ isLoading } className={ className }/>
      </PopoverTrigger>
      <PopoverContent w="330px">
        <PopoverBody>
          <Flex alignItems="center" justifyContent="space-between" mb={ 3 }>
            <Text color="text.secondary" fontWeight="600">{t('interop_messages.additional_info.message_payload')}</Text>
            <PopoverCloseTriggerWrapper>
              <CopyToClipboard text={ payload }/>
            </PopoverCloseTriggerWrapper>
          </Flex>
          <Text>
            { payload }
          </Text>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default React.memo(chakra(InteropMessageAdditionalInfo));
