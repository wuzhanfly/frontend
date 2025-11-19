import React from 'react';
import { useTranslation } from 'react-i18next';

import { ContentLoader } from 'toolkit/components/loaders/ContentLoader';

import { Section, Container, SectionHeader, SamplesStack, Sample } from './parts';

const ContentLoaderShowcase = () => {
  const { t } = useTranslation();

  return (
    <Container value="content-loader">
      <Section>
        <SectionHeader>{t('common.common.showcase.content_loader.variants')}</SectionHeader>
        <SamplesStack >
          <Sample label={t('common.common.default', 'default')}>
            <ContentLoader/>
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(ContentLoaderShowcase);
