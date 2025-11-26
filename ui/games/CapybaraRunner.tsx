/* eslint-disable @next/next/no-img-element */
import { Box, Text, Flex } from '@chakra-ui/react';
import Script from 'next/script';
import React from 'react';
import { useTranslation } from 'react-i18next';

import config from 'configs/app';
import useIsMobile from 'lib/hooks/useIsMobile';
import { Button } from 'toolkit/chakra/button';
import { Heading } from 'toolkit/chakra/heading';
import { Link } from 'toolkit/chakra/link';
const easterEggBadgeFeature = config.features.easterEggBadge;

const CapybaraRunner = () => {
  const { t } = useTranslation();
  const [ hasReachedHighScore, setHasReachedHighScore ] = React.useState(false);

  const isMobile = useIsMobile();

  React.useEffect(() => {
    const preventDefaultKeys = (e: KeyboardEvent) => {
      if (e.code === t('games.common.space') || e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        e.preventDefault();
      }
    };

    const handleHighScore = () => {
      setHasReachedHighScore(true);
    };

    window.addEventListener('reachedHighScore', handleHighScore);
    window.addEventListener('keydown', preventDefaultKeys);

    return () => {
      window.removeEventListener('keydown', preventDefaultKeys);
      window.removeEventListener('reachedHighScore', handleHighScore);
    };
  }, []);

  return (
    <>
      <Heading level="2" mt={ 12 } mb={ 2 }>{t('games.capybara_runner.score_to_win_prize')}</Heading>
      <Box mb={ 4 }>{ isMobile ? t('games.common.tap_below_to_start') : t('games.common.press_space_to_start') }</Box>
      <Script strategy="lazyOnload" src="/static/capibara/index.js"/>
      <Box width={{ base: '100%', lg: '600px' }} height="300px" p="50px 0">
        <div id="main-frame-error" className="interstitial-wrapper" style={{ marginTop: '20px' }}>
          <div id="main-content"></div>
          <div id="offline-resources" style={{ display: 'none' }}>
            <img id="offline-resources-1x" src="/static/capibara/capybaraSprite.png"/>
            <img id="offline-resources-2x" src="/static/capibara/capybaraSpriteX2.png"/>
          </div>
        </div>
      </Box>
      { easterEggBadgeFeature.isEnabled && hasReachedHighScore && (
        <Flex flexDirection="column" alignItems="center" justifyContent="center" gap={ 4 } mt={ 10 }>
          <Text fontSize="2xl" fontWeight="bold">{t('games.capybara_runner.unlocked_hidden_badge')}</Text>
          <Text fontSize="lg" textAlign="center">{t('games.capybara_runner.eligible_to_claim_badge')}</Text>
          <Link
            href={ easterEggBadgeFeature.badgeClaimLink }
            external noIcon
          >
            <Button>{t('games.common.claim')}</Button>
          </Link>
        </Flex>
      ) }
    </>
  );
};

export default CapybaraRunner;
