import i18n from 'i18next';

import config from 'configs/app';

export default function getNetworkValidatorTitle() {
  const t = i18n.t.bind(i18n);

  switch (config.chain.verificationType) {
    case 'validation': {
      return t('blocks.common.validator');
    }
    case 'mining': {
      return t('blocks.common.miner');
    }
    case 'posting': {
      return t('blocks.common.poster');
    }
    case 'sequencing': {
      return t('blocks.common.sequencer');
    }
    case 'fee reception': {
      return t('blocks.common.fee_recipient');
    }
    default: {
      return t('blocks.common.miner');
    }
  }
}
