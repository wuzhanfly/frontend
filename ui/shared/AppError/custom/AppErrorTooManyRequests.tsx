import { Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import config from 'configs/app';
import buildUrl from 'lib/api/buildUrl';
import useFetch from 'lib/hooks/useFetch';
import { Button } from 'toolkit/chakra/button';
import { toaster } from 'toolkit/chakra/toaster';
import { SECOND } from 'toolkit/utils/consts';
import { apos } from 'toolkit/utils/htmlEntities';
import ReCaptcha from 'ui/shared/reCaptcha/ReCaptcha';
import useReCaptcha from 'ui/shared/reCaptcha/useReCaptcha';

import AppErrorIcon from '../AppErrorIcon';
import AppErrorTitle from '../AppErrorTitle';

function formatTimeLeft(timeLeft: number) {
  const { t } = useTranslation();
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return `${ hours.toString().padStart(2, '0') }h ${ minutes.toString().padStart(2, '0') }m ${ seconds.toString().padStart(2, '0') }s`;
}

interface Props {
  bypassOptions?: string;
  reset?: string;
}

const AppErrorTooManyRequests = ({ bypassOptions, reset }: Props) => {
  const { t } = useTranslation();

  const [ timeLeft, setTimeLeft ] = React.useState(reset ? Math.ceil(Number(reset) / SECOND) : undefined);

  const fetch = useFetch();
  const recaptcha = useReCaptcha();

  const handleSubmit = React.useCallback(async() => {
    try {
      const token = await recaptcha.executeAsync();

      if (!token) {
        throw new Error(t('shared.common.recaptcha_is_not_solved'));
      }

      const url = buildUrl('general:api_v2_key');

      await fetch(url, {
        method: 'POST',
        body: { recaptcha_response: token },
        headers: {
          'recaptcha-v2-response': token,
        },
        credentials: 'include',
      }, {
        resource: 'general:api_v2_key',
      });

      window.location.reload();

    } catch (error) {
      toaster.create({
        title: 'Error',
        description: t('shared.common.unable_to_get_client_key'),
        type: 'error',
      });
    }
  }, [ recaptcha, fetch ]);

  React.useEffect(() => {
    if (reset === undefined) {
      return;
    }

    const interval = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev && prev > 1) {
          return prev - 1;
        }

        window.clearInterval(interval);
        window.location.reload();

        return 0;
      });
    }, SECOND);

    return () => {
      window.clearInterval(interval);
    };
  }, [ reset ]);

  if (!config.services.reCaptchaV2.siteKey) {
    throw new Error(t('shared.common.recaptcha_v2_site_key_is_not_s'));
  }

  const text = (() => {
  const { t } = useTranslation();
    if (timeLeft === undefined && bypassOptions === 'no_bypass') {
      return t('shared.common.rate_limit_exceeded');
    }

    const timeLeftText = timeLeft !== undefined ? `wait ${ formatTimeLeft(timeLeft) } ` : '';
    const bypassText = bypassOptions !== 'no_bypass' ? `verify you${ apos }re human ` : '';
    const orText = timeLeft !== undefined && bypassOptions !== 'no_bypass' ? 'OR ' : '';

    return `Rate limit exceeded. Please ${ timeLeftText }${ orText }${ bypassText }before making another request.`;
  })();

  return (
    <>
      <AppErrorIcon statusCode={ 429 }/>
      <AppErrorTitle title={t('shared.common.too_many_requests')}/>
      <Text color="text.secondary" mt={ 3 }>
        { text }
      </Text>
      <ReCaptcha { ...recaptcha }/>
      { bypassOptions !== 'no_bypass' && <Button onClick={ handleSubmit } disabled={ recaptcha.isInitError } mt={ 8 }>I'm not a robot</Button> }
    </>
  );
};

export default AppErrorTooManyRequests;
