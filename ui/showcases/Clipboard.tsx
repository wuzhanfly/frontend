import React from 'react';
import { useTranslation } from 'react-i18next';

import CopyToClipboard from 'ui/shared/CopyToClipboard';

import { Section, Container, SectionHeader, SamplesStack, Sample } from './parts';

const ClipboardShowcase = () => {
  const { t } = useTranslation();

  return (
    <Container value="clipboard">
      <Section>
        <SectionHeader>Type</SectionHeader>
        <SamplesStack>
          <Sample label="type: text">
            <CopyToClipboard text={t('common.common.hello_world')} type="text"/>
          </Sample>
          <Sample label="type: link">
            <CopyToClipboard text={t('common.common.hello_world')} type="link"/>
          </Sample>
          <Sample label="type: share">
            <CopyToClipboard text={t('common.common.hello_world')} type="share"/>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>Loading</SectionHeader>
        <SamplesStack>
          <Sample label="loading: true">
            <CopyToClipboard text={t('common.common.hello_world')} type="text" isLoading/>
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(ClipboardShowcase);
