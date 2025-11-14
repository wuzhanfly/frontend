import React from 'react';
import { useTranslation } from 'react-i18next';
import type ReCAPTCHA from 'react-google-recaptcha';

import getErrorCauseStatusCode from 'lib/errors/getErrorCauseStatusCode';
import getErrorObjStatusCode from 'lib/errors/getErrorObjStatusCode';

export default function useReCaptcha() {
  const { t } = useTranslation();
  const ref = React.useRef<ReCAPTCHA>(null);
  const rejectCb = React.useRef<((error: Error) => void) | null>(null);

  const [ isOpen, setIsOpen ] = React.useState(false);
  const [ isInitError, setIsInitError ] = React.useState(false);

  const executeAsync: () => Promise<string | null> = React.useCallback(async() => {
    setIsOpen(true);
    const tokenPromise = ref.current?.executeAsync() || Promise.reject(new Error(t('shared.common.unable_to_execute_recaptcha')));
    const modalOpenPromise = new Promise<null>((resolve, reject) => {
      rejectCb.current = reject;
    });

    return Promise.race([ tokenPromise, modalOpenPromise ]);
  }, [ ref ]);

  const handleContainerClick = React.useCallback(() => {
    setIsOpen(false);
    rejectCb.current?.(new Error(t('shared.common.recaptcha_is_not_solved')));
  }, []);

  const handleInitError = React.useCallback(() => {
    setIsInitError(true);
  }, []);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const container = window.document.querySelector('div:has(div):has(iframe[title="recaptcha challenge expires in two minutes"])');
    container?.addEventListener('click', handleContainerClick);

    return () => {
      container?.removeEventListener('click', handleContainerClick);
    };
  }, [ isOpen, handleContainerClick ]);

  const fetchProtectedResource: <T>(fetcher: (token?: string) => Promise<T>, token?: string) => Promise<T> = React.useCallback(async(fetcher, token) => {
    try {
      const result = await fetcher(token);
      return result;
    } catch (error) {
      const statusCode = error instanceof Error ? getErrorCauseStatusCode(error) : getErrorObjStatusCode(error);
      if (statusCode === 429) {
        const token = await executeAsync();

        if (!token) {
          throw new Error(t('shared.common.recaptcha_is_not_solved'));
        }

        return fetchProtectedResource(fetcher, token);
      }

      throw error;
    }
  }, [ executeAsync ]);

  return React.useMemo(() => ({
    ref,
    executeAsync,
    isInitError,
    onInitError: handleInitError,
    fetchProtectedResource,
  }), [ ref, executeAsync, isInitError, handleInitError, fetchProtectedResource ]);
}
