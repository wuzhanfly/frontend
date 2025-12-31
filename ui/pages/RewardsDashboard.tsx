import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import config from 'configs/app';
import { useRewardsContext } from 'lib/contexts/rewards';
import useIsMobile from 'lib/hooks/useIsMobile';
import { Alert } from 'toolkit/chakra/alert';
import { Button } from 'toolkit/chakra/button';
import { Link } from 'toolkit/chakra/link';
import RoutedTabs from 'toolkit/components/RoutedTabs/RoutedTabs';
import { useDisclosure } from 'toolkit/hooks/useDisclosure';
// import { apos } from 'toolkit/utils/htmlEntities';
import DailyRewardClaimButton from 'ui/rewards/dashboard/DailyRewardClaimButton';
import RewardsDashboardCard from 'ui/rewards/dashboard/RewardsDashboardCard';
import RewardsDashboardCardValue from 'ui/rewards/dashboard/RewardsDashboardCardValue';
import RewardsStreakModal from 'ui/rewards/dashboard/streakModal/RewardsStreakModal';
import ActivityTab from 'ui/rewards/dashboard/tabs/ActivityTab';
import ReferralsTab from 'ui/rewards/dashboard/tabs/ReferralsTab';
import ResourcesTab from 'ui/rewards/dashboard/tabs/ResourcesTab';
import useStreakBadges from 'ui/rewards/hooks/useStreakBadges';
import AdBanner from 'ui/shared/ad/AdBanner';
import PageTitle from 'ui/shared/Page/PageTitle';
import useRedirectForInvalidAuthToken from 'ui/snippets/auth/useRedirectForInvalidAuthToken';

const RewardsDashboard = () => {
  const { t } = useTranslation();
  const { balancesQuery, apiToken, referralsQuery, rewardsConfigQuery, dailyRewardQuery, isInitialized } = useRewardsContext();
  const { nextAchievementText, isLoading: isBadgesLoading, badgesQuery } = useStreakBadges();
  const streakModal = useDisclosure();
  const isMobile = useIsMobile();

  const [ isError, setIsError ] = useState(false);

  useRedirectForInvalidAuthToken();

  useEffect(() => {
    if (!config.features.rewards.isEnabled || (isInitialized && !apiToken)) {
      window.location.assign('/');
    }
  }, [ isInitialized, apiToken ]);

  useEffect(() => {
    setIsError(balancesQuery.isError || referralsQuery.isError || rewardsConfigQuery.isError || dailyRewardQuery.isError);
  }, [ balancesQuery.isError, referralsQuery.isError, rewardsConfigQuery.isError, dailyRewardQuery.isError ]);

  if (!config.features.rewards.isEnabled) {
    return null;
  }

  return (
    <>
      <Flex gap={ 3 } justifyContent="space-between" mb={ 6 }>
        <PageTitle
          title={ t('common.common.dashboard') }
          secondRow={ (
            <span>
              <Link external href={ `https://merits.blockscout.com/?tab=users&utm_source=${ config.chain.id }&utm_medium=text-banner` }>
                { t('rewards.common.explore_the_merits_hub') }
              </Link>{ ' ' }
              { t('rewards.common.to_earn_spend_and_learn_more_about_the_program') }
            </span>
          ) }
          mb={ 0 }
        />
        { !isMobile && <AdBanner format="mobile" w="fit-content" flexShrink={ 0 } borderRadius="md" overflow="hidden"/> }
      </Flex>
      <Flex flexDirection="column" alignItems="flex-start" w="full" gap={ 6 }>
        { isError && <Alert status="error">{ t('common.common.failed_to_load_some_data_please_try_again_later') }</Alert> }
        <Flex gap={ 6 } flexDirection={{ base: 'column', md: 'row' }} w="full">
          <RewardsDashboardCard
            title={ t('rewards.common.all_merits') }
            description={ t('rewards.common.claim_your_daily_merits_and_any_merits_received_from_referrals') }
            contentDirection="column-reverse"
            cardValueStyle={{ minH: { base: '64px', md: '116px' } }}
            contentAfter={ <DailyRewardClaimButton/> }
            hint={ (
              <>
                { t('rewards.common.total_merits_earned') }{ ' ' }
                <Link external href="https://docs.blockscout.com/using-blockscout/merits">
                  { t('rewards.common.more_info_on_merits') }
                </Link>
              </>
            ) }
          >
            <RewardsDashboardCardValue
              value={ balancesQuery.data?.total || t('common.common.not_available') }
              isLoading={ balancesQuery.isPending }
              withIcon
            />
          </RewardsDashboardCard>
          <RewardsDashboardCard
            title={ t('rewards.common.referrals') }
            description={ t('rewards.common.referrals_description') }
            contentDirection="column-reverse"
            cardValueStyle={{ minH: { base: '64px', md: '116px' } }}
          >
            <RewardsDashboardCardValue
              value={ referralsQuery.data?.referrals ?
                `${ referralsQuery.data?.referrals } user${ Number(referralsQuery.data?.referrals) === 1 ? '' : 's' }` :
                t('common.common.not_available')
              }
              isLoading={ referralsQuery.isPending }
            />
          </RewardsDashboardCard>
          <RewardsDashboardCard
            title={ t('rewards.common.streak') }
            description={ t('rewards.common.streak_description') }
            hint={ (
              <>
                { t('rewards.common.streak_hint') }{ ' ' }
                <Link external href="https://docs.blockscout.com/using-blockscout/merits/streak-rewards">{ t('rewards.common.streak_hint_link') }</Link>{ ' ' }
                { t('rewards.common.streak_hint_suffix') }
              </>
            ) }
            contentDirection="column-reverse"
            cardValueStyle={{ minH: { base: '64px', md: '116px' } }}
            contentAfter={ (
              <Button mt={ 3 } onClick={ streakModal.onOpen } loading={ isBadgesLoading }>
                { t('rewards.common.check_achievements') }
              </Button>
            ) }
          >
            <RewardsDashboardCardValue
              value={ dailyRewardQuery.data?.streak ?
                `${ dailyRewardQuery.data?.streak } day${ Number(dailyRewardQuery.data?.streak) === 1 ? '' : 's' }` :
                t('common.common.not_available') }
              isLoading={ dailyRewardQuery.isPending }
              bottomText={ nextAchievementText }
              isBottomTextLoading={ isBadgesLoading }
            />
          </RewardsDashboardCard>
        </Flex>
        <RoutedTabs
          w="full"
          tabs={ [
            {
              id: 'activity',
              title: t('common.common.activity'),
              component: <ActivityTab/>,
            },
            {
              id: 'referrals',
              title: t('rewards.common.referrals'),
              component: <ReferralsTab/>,
            },
            {
              id: 'resources',
              title: t('common.common.resources'),
              component: <ResourcesTab/>,
            },
          ] }
        />
      </Flex>
      { !isBadgesLoading && !dailyRewardQuery.isPending && (
        <RewardsStreakModal
          open={ streakModal.open }
          onOpenChange={ streakModal.onOpenChange }
          currentStreak={ Number(dailyRewardQuery.data?.streak || 0) }
          badges={ badgesQuery.data?.items }
        />
      ) }
    </>
  );
};

export default RewardsDashboard;
