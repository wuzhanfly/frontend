import i18n from 'i18next';

export default function getNetworkUtilizationParams(value: number) {
  const t = i18n.t.bind(i18n);

  const load = (() => {
    if (value > 80) {
      return t('blocks.common.load_high');
    }

    if (value > 50) {
      return t('blocks.common.load_medium');
    }

    return t('blocks.common.load_low');
  })();

  const colors = {
    [t('blocks.common.load_high')]: 'red.600',
    [t('blocks.common.load_medium')]: 'orange.600',
    [t('blocks.common.load_low')]: 'green.600',
  };
  const color = colors[load];

  return {
    load,
    color,
  };
}
