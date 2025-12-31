import { VStack, Code, Flex, Box } from '@chakra-ui/react';
import mixpanel from 'mixpanel-browser';
import type { ChangeEvent } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import config from 'configs/app';
import * as cookies from 'lib/cookies';
import useFeatureValue from 'lib/growthbook/useFeatureValue';
import useGradualIncrement from 'lib/hooks/useGradualIncrement';
import { useRollbar } from 'lib/rollbar';
import { Alert } from 'toolkit/chakra/alert';
import { Button } from 'toolkit/chakra/button';
import { Textarea } from 'toolkit/chakra/textarea';
import { toaster } from 'toolkit/chakra/toaster';
import PageTitle from 'ui/shared/Page/PageTitle';

const Login = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const [ num, setNum ] = useGradualIncrement(0);
  const testFeature = useFeatureValue('test_value', 'fallback');

  const [ isFormVisible, setFormVisibility ] = React.useState(false);
  const [ token, setToken ] = React.useState('');

  React.useEffect(() => {
    const token = cookies.get(cookies.NAMES.API_TOKEN);
    setFormVisibility(Boolean(!token && config.features.account.isEnabled));
    // throw new Error('Render error');
  }, []);

  const checkRollbar = React.useCallback(() => {
    rollbar?.error(t('common.common.test_error'), { payload: 'foo' });
  }, [ rollbar, t ]);

  const checkMixpanel = React.useCallback(() => {
    mixpanel.track(t('common.common.test_event'), { my_prop: 'foo bar' });
  }, [ t ]);

  const handleTokenChange = React.useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setToken(event.target.value);
  }, []);

  const handleSetTokenClick = React.useCallback(() => {
    cookies.set(cookies.NAMES.API_TOKEN, token);
    setToken('');
    toaster.create({
      title: t('common.common.success_'),
      description: t('common.common.successfully_set_cookie'),
      type: 'success',
      onStatusChange: (details) => {
        if (details.status === 'unmounted') {
          setFormVisibility(false);
        }
      },
    });
  }, [ token, t ]);

  const handleNumIncrement = React.useCallback(() => {
    for (let index = 0; index < 5; index++) {
      setNum(5);
    }
  }, [ setNum ]);

  return (
    <VStack gap={ 4 } alignItems="flex-start" maxW="1000px">
      <PageTitle title={ t('common.common.login_page_') }/>
      { isFormVisible && (
        <>
          <Alert
            status="warning"
            title={ t('common.common.temporary_solution') }
            inline={ false }
          >
            { t('common.common.to_sign_in_go_to_production') }
            <Code ml={ 1 }>{ cookies.NAMES.API_TOKEN }</Code> { t('common.common.and_paste_it_in_the_form_below') }
          </Alert>
          <Textarea value={ token } onChange={ handleTokenChange } placeholder={ t('common.common.api_token') }/>
          <Button onClick={ handleSetTokenClick }>{ t('common.common.set_cookie') }</Button>
        </>
      ) }
      <Flex columnGap={ 2 }>
        <Button colorScheme="red" onClick={ checkRollbar }>{ t('common.common.check_rollbar') }</Button>
        <Button colorScheme="teal" onClick={ checkMixpanel }>{ t('common.common.check_mixpanel') }</Button>
      </Flex>
      <Flex columnGap={ 2 } alignItems="center">
        <Box w="50px" textAlign="center">{ num }</Box>
        <Button onClick={ handleNumIncrement } size="sm">{ t('common.common.add') }</Button>
      </Flex>
      <Box>{ t('common.common.test_feature_value') } <b>{ testFeature.isLoading ?
        t('common.common.loading') + '...' : JSON.stringify(testFeature.value) }</b></Box>
    </VStack>
  );

};

export default Login;
