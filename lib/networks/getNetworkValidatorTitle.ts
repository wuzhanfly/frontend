import config from 'configs/app';

export default function getNetworkValidatorTitle() {
  switch (config.chain.verificationType) {
    case 'validation': {
      return 'common.common.validator';
    }
    case 'mining': {
      return 'common.common.miner';
    }
    case 'posting': {
      return 'common.common.poster';
    }
    case 'sequencing': {
      return 'common.common.sequencer';
    }
    case 'fee reception': {
      return 'common.common.fee_recipient';
    }
    default: {
      return 'common.common.miner';
    }
  }
}
