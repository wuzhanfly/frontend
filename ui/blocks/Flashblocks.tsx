import { Box, HStack } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import config from 'configs/app';
import { Switch } from 'toolkit/chakra/switch';
import { Hint } from 'toolkit/components/Hint/Hint';

import FlashblocksList from './flashblocks/FlashblocksList';
import FlashblocksStats from './flashblocks/FlashblocksStats';
import FlashblocksTable from './flashblocks/FlashblocksTable';
import useFlashblocksSocketData from './flashblocks/useFlashblocksSocketData';

const flashblocksFeature = config.features.flashblocks;

const Flashblocks = () => {
  const { t } = useTranslation();

  const manualModeRef = React.useRef(false);
  const [ isRealTime, setIsRealTime ] = React.useState(true);
  const { items, itemsNum, newItemsNum, txsNum, pause, resume, initialTs, status } = useFlashblocksSocketData();

  const handleFormatChange = React.useCallback(({ checked }: { checked: boolean }) => {
    if (checked) {
      resume();
    } else {
      pause();
    }
    setIsRealTime(checked);
    manualModeRef.current = !checked;
  }, [ pause, resume ]);

  const handleAlertLinkClick = React.useCallback(() => {
    handleFormatChange({ checked: true });
  }, [ handleFormatChange ]);

  const showAlertError = status === 'error' || status === 'disconnected';

  if (!flashblocksFeature.isEnabled) {
    return null;
  }

  return (
    <Box>
      <FlashblocksStats itemsNum={ itemsNum } txsNum={ txsNum } initialTs={ initialTs }/>
      <HStack gap={ 2 } mb={ 4 }>
        <Switch size="md" flexDirection="row-reverse" onCheckedChange={ handleFormatChange } checked={ isRealTime }>
          { t('blocks.common.real_time_feed') }
        </Switch>
        <Hint
          label={ t('blocks.common.real_time_flashblocks_description', {
            flashblocksName: flashblocksFeature.name,
            defaultValue: `Real-time {{flashblocksName}}s show the latest {{flashblocksName}}s with real-time updates in the chronological order. `,
          }) }
        />
      </HStack>
      <Box hideBelow="lg">
        <FlashblocksTable
          items={ items }
          newItemsNum={ newItemsNum }
          onAlertLinkClick={ handleAlertLinkClick }
          showAlertError={ showAlertError }
        />
      </Box>
      <Box hideFrom="lg">
        <FlashblocksList
          data={ items }
          newItemsNum={ newItemsNum }
          onAlertLinkClick={ handleAlertLinkClick }
          showAlertError={ showAlertError }
        />
      </Box>
    </Box>
  );
};

export default React.memo(Flashblocks);
