import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import getErrorCause from 'lib/errors/getErrorCause';
import getErrorCauseStatusCode from 'lib/errors/getErrorCauseStatusCode';
import getErrorObjStatusCode from 'lib/errors/getErrorObjStatusCode';
import getErrorProp from 'lib/errors/getErrorProp';
import getResourceErrorPayload from 'lib/errors/getResourceErrorPayload';
import { Button } from 'toolkit/chakra/button';
import { Link } from 'toolkit/chakra/link';
import AdBannerContent from 'ui/shared/ad/AdBannerContent';

import AppErrorIcon from './AppErrorIcon';
import AppErrorTitle from './AppErrorTitle';
import AppErrorBlockConsensus from './custom/AppErrorBlockConsensus';
import AppErrorTooManyRequests from './custom/AppErrorTooManyRequests';
import AppErrorTxNotFound from './custom/AppErrorTxNotFound';

const adBannerConfig = config.features.adsBanner;

interface Props {
  className?: string;
  error: Error | undefined;
}

const AppError = ({ error, className }: Props) => {
  const { t } = useTranslation();

  const ERROR_TEXTS: Record<string, { title: string; text: string }> = {
    '403': {
      title: t('shared.common.alert'),
      text: t('shared.common.access_to_this_resource_is_res'),
    },
    '404': {
      title: t('shared.common.page_not_found'),
      text: 'This page is no longer explorable! If you are lost, use the search bar to find what you are looking for.',
    },
    '422': {
      title: t('shared.common.request_cannot_be_processed'),
      text: 'Your request contained an error, perhaps a mistyped tx/block/address hash. Try again, and check the developer tools console for more info.',
    },
    '500': {
      title: t('shared.common.oops_something_went_wrong'),
      text: t('shared.common.an_unexpected_error_has_occurr'),
    },
  };

  const content = (() => {
    const resourceErrorPayload = getResourceErrorPayload(error);
    const cause = getErrorCause(error);
    const messageInPayload =
          resourceErrorPayload &&
          typeof resourceErrorPayload === 'object' &&
          'message' in resourceErrorPayload &&
          typeof resourceErrorPayload.message === 'string' ?
            resourceErrorPayload.message :
            undefined;
    const statusCode = getErrorCauseStatusCode(error) || getErrorObjStatusCode(error);

    const isInvalidTxHash = cause && 'resource' in cause && cause.resource === 'general:tx' && statusCode === 404;
    const isBlockConsensus = messageInPayload?.includes(t('shared.common.block_lost_consensus'));

    if (isInvalidTxHash) {
      return <AppErrorTxNotFound/>;
    }

    if (isBlockConsensus) {
      const hash =
              resourceErrorPayload &&
              typeof resourceErrorPayload === 'object' &&
              'hash' in resourceErrorPayload &&
              typeof resourceErrorPayload.hash === 'string' ?
                resourceErrorPayload.hash :
                undefined;
      return <AppErrorBlockConsensus hash={ hash }/>;
    }

    switch (statusCode) {
      case 429: {
        const rateLimits = getErrorProp(error, 'rateLimits');
        const bypassOptions = typeof rateLimits === 'object' && rateLimits && 'bypassOptions' in rateLimits ? rateLimits.bypassOptions : undefined;
        const reset = typeof rateLimits === 'object' && rateLimits && 'reset' in rateLimits ? rateLimits.reset : undefined;
        return (
          <AppErrorTooManyRequests
            bypassOptions={ typeof bypassOptions === 'string' ? bypassOptions : undefined }
            reset={ typeof reset === 'string' ? reset : undefined }/>
        );
      }

      default: {
        const { title, text } = ERROR_TEXTS[String(statusCode)] ?? ERROR_TEXTS[500];

        const adBannerProvider = adBannerConfig.isEnabled ? adBannerConfig.provider : null;

        return (
          <>
            <AppErrorIcon statusCode={ statusCode }/>
            <AppErrorTitle title={ title }/>
            { error ? t('shared.common.an_unexpected_error_has_occurr') : t('shared.common.unknown_error') }
            <Link
              href={ route({ pathname: '/' }) }
              asChild
            >
              <Button
                mt={ 8 }
                variant="outline"
              >
                Back to home
              </Button>
            </Link>
            { statusCode === 404 && adBannerProvider && <AdBannerContent mt={ 12 } provider={ adBannerProvider }/> }
          </>
        );
      }
    }
  })();

  return (
    <Box className={ className } mt={{ base: '52px', lg: '104px' }} maxW="800px">
      { content }
    </Box>
  );
};

export default React.memo(AppError);
