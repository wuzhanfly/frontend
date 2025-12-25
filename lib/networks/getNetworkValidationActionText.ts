import i18n from 'i18next';

import config from 'configs/app';

export default function getNetworkValidationActionText(chainConfig = config) {
  const t = i18n.t.bind(i18n);

  switch (chainConfig.chain.verificationType) {
    case 'validation': {
      return t('txs.common.validated');
    }
    case 'mining': {
      return t('txs.common.mined');
    }
    case 'posting': {
      return t('txs.common.posted');
    }
    case 'sequencing': {
      return t('txs.common.sequenced');
    }
    case 'fee reception': {
      return t('txs.common.validated');
    }
    default: {
      return t('txs.common.mined');
    }
  }
}
