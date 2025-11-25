import { TFunction } from 'i18next';
import config from 'configs/app';

export default function getNetworkValidatorTitleIntl(t: TFunction) {
  switch (config.chain.verificationType) {
    case 'validation': {
      return t('common.common.validator');
    }
    case 'mining': {
      return t('common.common.miner');
    }
    case 'posting': {
      return t('common.common.poster');
    }
    case 'sequencing': {
      return t('common.common.sequencer');
    }
    case 'fee reception': {
      return t('common.common.fee_recipient');
    }
    default: {
      return t('common.common.miner');
    }
  }
}