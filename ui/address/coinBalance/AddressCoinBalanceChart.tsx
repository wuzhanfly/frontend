import BigNumber from 'bignumber.js';
import React from 'react';
import { useTranslation } from 'react-i18next';

import config from 'configs/app';
import useApiQuery from 'lib/api/useApiQuery';
import { currencyUnits } from 'lib/units';
import { ChartWidget } from 'toolkit/components/charts/ChartWidget';
import { useChartsConfig } from 'ui/shared/chart/config';

interface Props {
  addressHash: string;
}

const AddressCoinBalanceChart = ({ addressHash }: Props) => {
  const { t } = useTranslation();
  const { data, isPending, isError } = useApiQuery('general:address_coin_balance_chart', {
    pathParams: { hash: addressHash },
  });
  const chartsConfig = useChartsConfig();

  const charts = React.useMemo(() => {
    if (!data) {
      return [];
    }

    return [
      {
        id: 'balance',
        name: t('addresses.common.value'),
        items: data.items.map(({ date, value }) => ({
          date: new Date(date),
          value: BigNumber(value).div(10 ** config.chain.currency.decimals).toNumber(),
        })),
        charts: chartsConfig,
        units: currencyUnits.ether,
      },
    ];
  }, [chartsConfig, data, t]);

  return (
    <ChartWidget
      isError={ isError }
      title={ t('addresses.common.balances') }
      charts={ charts }
      isLoading={ isPending }
      h="300px"
      emptyText={ data?.days ? t('addresses.common.insufficient_data_for_the_past_days', { days: data.days }) : undefined }
    />
  );
};

export default React.memo(AddressCoinBalanceChart);
