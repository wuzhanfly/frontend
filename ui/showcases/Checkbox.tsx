import React from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox, CheckboxGroup } from 'toolkit/chakra/checkbox';

import { Section, Container, SectionHeader, SamplesStack, Sample } from './parts';

const CheckboxShowcase = () => {
  const { t } = useTranslation();

  return (
    <Container value="checkbox">
      <Section>
        <SectionHeader>{t('common.common.variant', 'Variant')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.variant_subtle', 'variant: subtle')}>
            <Checkbox>{t('common.common.option1', 'Option 1')}</Checkbox>
            <Checkbox checked>{t('common.common.option2', 'Option 2')}</Checkbox>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.size', 'Size')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.size_md', 'size: md')}>
            <Checkbox size="md">{t('common.common.option1', 'Option 1')}</Checkbox>
            <Checkbox size="md">{t('common.common.option2', 'Option 2')}</Checkbox>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.disabled', 'Disabled')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.disabled_true', 'disabled: true')}>
            <Checkbox disabled>{t('common.common.option1', 'Option 1')}</Checkbox>
            <Checkbox checked disabled>{t('common.common.option2', 'Option 2')}</Checkbox>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.read_only', 'Read-only')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.read_only_true', 'readOnly: true')}>
            <Checkbox readOnly>{t('common.common.option1', 'Option 1')}</Checkbox>
            <Checkbox checked readOnly>{t('common.common.option2', 'Option 2')}</Checkbox>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.orientation', 'Orientation')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.orientation_vertical', 'orientation: vertical')}>
            <CheckboxGroup orientation="vertical">
              <Checkbox value="1">{t('common.common.option1', 'Option 1')}</Checkbox>
              <Checkbox value="2">{t('common.common.option2', 'Option 2')}</Checkbox>
            </CheckboxGroup>
          </Sample>
          <Sample label={t('common.common.orientation_horizontal', 'orientation: horizontal')}>
            <CheckboxGroup orientation="horizontal">
              <Checkbox value="1">{t('common.common.option1', 'Option 1')}</Checkbox>
              <Checkbox value="2">{t('common.common.option2', 'Option 2')}</Checkbox>
            </CheckboxGroup>
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(CheckboxShowcase);
