import { Grid } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import config from 'configs/app';
import { apos } from 'toolkit/utils/htmlEntities';

import RewardsDashboardInfoCard from '../RewardsDashboardInfoCard';

export default function ResourcesTab() {
  const { t } = useTranslation();
  return (
    <Grid
      w="full"
      gap={ 6 }
      templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
    >
      <RewardsDashboardInfoCard
        title={t('dashboard.common.badges')}
        description={ `Collect limited and legendary badges by completing different Blockscout related tasks.
          Go to the badges website to see what${ apos }s available and start your collection today.` }
        imageSrc="/static/merits/badges.svg"
        imageWidth="180px"
        imageHeight="86px"
        linkText={t('dashboard.common.view_badges')}
        linkHref={ `https://merits.blockscout.com/?tab=badges&utm_source=${ config.chain.id }&utm_medium=badges` }
      />
      <RewardsDashboardInfoCard
        title={t('dashboard.common.blockscout_campaigns')}
        description="Join Blockscout activities to earn bonus Merits and exclusive rewards from our partners!"
        imageSrc="/static/merits/campaigns.svg"
        imageWidth="180px"
        imageHeight="76px"
        linkText={t('dashboard.common.check_campaigns')}
        linkHref={ `https://merits.blockscout.com/?tab=campaigns&utm_source=${ config.chain.id }&utm_medium=campaigns` }
      />
      <RewardsDashboardInfoCard
        title={t('dashboard.common.use_your_merits')}
        description={t('dashboard.common.spend_your_merits_to_get_exclu')}
        imageSrc="/static/merits/offers.svg"
        imageWidth="180px"
        imageHeight="86px"
        linkText={t('dashboard.common.check_offers')}
        linkHref={ `https://merits.blockscout.com/?tab=spend&utm_source=${ config.chain.id }&utm_medium=spend` }
      />
    </Grid>
  );
}
