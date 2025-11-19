import React from 'react';
import { useTranslation } from 'react-i18next';

import { CloseButton } from 'toolkit/chakra/close-button';

import { Section, Container, SectionHeader, SamplesStack, Sample } from './parts';

const CloseButtonShowcase = () => {
  const { t } = useTranslation();

  return (
    <Container value="close-button">
      <Section>
        <SectionHeader>{t('common.common.showcase.close_button.variants')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.variant_default', 'variant: default')}>
            <CloseButton/>
            <CloseButton data-hover/>
            <CloseButton disabled/>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.showcase.close_button.size')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.size_md', 'size: md')}>
            <CloseButton size="md" outline="1px dashed lightpink"/>
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(CloseButtonShowcase);
