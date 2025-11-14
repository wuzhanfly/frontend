import React from 'react';
import { useTranslation } from 'react-i18next';

import { Tooltip } from 'toolkit/chakra/tooltip';
import type { IconName } from 'ui/shared/IconSvg';
import IconSvg from 'ui/shared/IconSvg';

type Props = {
  internalWallet: boolean | undefined;
  external: boolean | undefined;
};

const MarketplaceAppIntegrationIcon = ({ external, internalWallet }: Props) => {
  const { t } = useTranslation();
  const [ icon, iconColor, text, boxSize ] = React.useMemo(() => {
    let icon: IconName = 'integration/partial';
    let color = 'icon.secondary';
    let text = 'This app opens in Blockscout without Blockscout wallet functionality. Use your external web3 wallet to connect directly to this application';
    let boxSize = 5;

    if (external) {
      icon = 'link_external';
      color = 'icon.secondary';
      text = t('marketplace.common.this_app_opens_in_a_separate_t');
      boxSize = 4;
    } else if (internalWallet) {
      icon = 'integration/full';
      color = 'green.500';
      text = t('marketplace.common.this_app_opens_in_blockscout_a');
    }

    return [ icon, color, text, boxSize ];
  }, [ external, internalWallet, t ]);

  return (
    <Tooltip
      content={ text }
      openDelay={ 300 }
      contentProps={{ maxW: { base: 'calc(100vw - 8px)', lg: '400px' } }}
    >
      <IconSvg
        name={ icon }
        boxSize={ boxSize }
        color={ iconColor }
        position="relative"
        cursor="pointer"
        verticalAlign="middle"
      />
    </Tooltip>
  );
};

export default MarketplaceAppIntegrationIcon;
