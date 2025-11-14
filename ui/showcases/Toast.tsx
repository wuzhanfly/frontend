/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'toolkit/chakra/button';
import { toaster } from 'toolkit/chakra/toaster';

import { Section, Container, SectionHeader, SamplesStack, Sample } from './parts';

const ToastShowcase = () => {
  const { t } = useTranslation();
  return (
    <Container value="toast">
      <Section>
        <SectionHeader>{t('common.common.showcase.toast.type')}</SectionHeader>
        <SamplesStack>
          <Sample label="type: info">
            <Button onClick={ () => toaster.create({ title: 'Info', description: t('common.common.toast_content'), type: 'info' }) }>
              Info
            </Button>
          </Sample>
          <Sample label="type: success">
            <Button onClick={ () => toaster.success({ title: 'Success', description: t('common.common.toast_content') }) }>
              Success
            </Button>
          </Sample>
          <Sample label="type: warning">
            <Button onClick={ () => toaster.create({ title: 'Warning', description: t('common.common.toast_content'), type: 'warning' }) }>
              Warning
            </Button>
          </Sample>
          <Sample label="type: error">
            <Button onClick={ () => toaster.error({ title: 'Error', description: t('common.common.toast_content') }) }>
              Error
            </Button>
          </Sample>
          <Sample label="type: loading">
            <Button onClick={ () => toaster.loading({ title: 'Loading', description: t('common.common.please_wait_for') }) }>
              Loading
            </Button>
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(ToastShowcase);
