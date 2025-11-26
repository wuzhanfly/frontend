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
        <SectionHeader>{ t('common.common.showcase.toast.type') }</SectionHeader>
        <SamplesStack>
          <Sample label="type: info">
            <Button onClick={ () => toaster.create({ title: t('showcases.toast.info'), description: t('common.common.toast_content'), type: 'info' }) }>
              { t('showcases.toast.info') }
            </Button>
          </Sample>
          <Sample label="type: success">
            <Button onClick={ () => toaster.success({ title: t('showcases.toast.success'), description: t('common.common.toast_content') }) }>
              { t('showcases.toast.success') }
            </Button>
          </Sample>
          <Sample label="type: warning">
            <Button onClick={ () => toaster.create({ title: t('showcases.toast.warning'), description: t('common.common.toast_content'), type: 'warning' }) }>
              { t('showcases.toast.warning') }
            </Button>
          </Sample>
          <Sample label="type: error">
            <Button onClick={ () => toaster.error({ title: t('showcases.toast.error'), description: t('common.common.toast_content') }) }>
              { t('showcases.toast.error') }
            </Button>
          </Sample>
          <Sample label="type: loading">
            <Button onClick={ () => toaster.loading({ title: t('showcases.toast.loading'), description: t('common.common.please_wait_for') }) }>
              { t('showcases.toast.loading') }
            </Button>
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(ToastShowcase);
