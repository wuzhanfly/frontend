import React from 'react';
import { useTranslation } from 'react-i18next';

import PageTitle from 'ui/shared/Page/PageTitle';

import UptimeCharts from './UptimeCharts';
import UptimeStats from './UptimeStats';
import UptimeStatus from './UptimeStatus';
import useUptimeSocketData from './useUptimeSocketData';

const Uptime = () => {
  const { t } = useTranslation();

  const { realtimeData, historyData, status, onReconnect } = useUptimeSocketData();

  return (
    <>
      <PageTitle
        title={t('common.common.uptime')}
        contentAfter={ <UptimeStatus status={ status } onReconnect={ onReconnect }/> }
      />
      <UptimeStats realtimeData={ realtimeData }/>
      <UptimeCharts historyData={ historyData }/>
    </>
  );
};

export default React.memo(Uptime);
