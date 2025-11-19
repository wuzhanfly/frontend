import React from 'react';
import { useTranslation } from 'react-i18next';

import { Radio, RadioGroup } from 'toolkit/chakra/radio';

import { Section, Container, SectionHeader, SamplesStack, Sample } from './parts';

const RadioShowcase = () => {
  const { t } = useTranslation();

  return (
    <Container value="radio">
      <Section>
        <SectionHeader>{t('common.common.variant', 'Variant')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.variant_subtle', 'variant: subtle')}>
            <RadioGroup defaultValue="1">
              <Radio value="1">{t('common.common.option1', 'Option 1')}</Radio>
              <Radio value="2">{t('common.common.option2', 'Option 2')}</Radio>
            </RadioGroup>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.size', 'Size')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.size_xs', 'size: xs')}>
            <RadioGroup defaultValue="1" size="xs">
              <Radio value="1">{t('common.common.option1', 'Option 1')}</Radio>
              <Radio value="2">{t('common.common.option2', 'Option 2')}</Radio>
            </RadioGroup>
          </Sample>
          <Sample label={t('common.common.size_sm', 'size: sm')}>
            <RadioGroup defaultValue="1" size="sm">
              <Radio value="1">{t('common.common.option1', 'Option 1')}</Radio>
              <Radio value="2">{t('common.common.option2', 'Option 2')}</Radio>
            </RadioGroup>
          </Sample>
          <Sample label={t('common.common.size_md', 'size: md')}>
            <RadioGroup defaultValue="1" size="md">
              <Radio value="1">{t('common.common.option1', 'Option 1')}</Radio>
              <Radio value="2">{t('common.common.option2', 'Option 2')}</Radio>
            </RadioGroup>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.orientation', 'Orientation')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.orientation_horizontal', 'orientation: horizontal')}>
            <RadioGroup defaultValue="1" orientation="horizontal">
              <Radio value="1">{t('common.common.option1', 'Option 1')}</Radio>
              <Radio value="2">{t('common.common.option2', 'Option 2')}</Radio>
            </RadioGroup>
          </Sample>
          <Sample label={t('common.common.orientation_vertical', 'orientation: vertical')}>
            <RadioGroup defaultValue="1" orientation="vertical">
              <Radio value="1">{t('common.common.option1', 'Option 1')}</Radio>
              <Radio value="2">{t('common.common.option2', 'Option 2')}</Radio>
            </RadioGroup>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.disabled', 'Disabled')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.disabled_true', 'disabled: true')}>
            <RadioGroup defaultValue="1" disabled>
              <Radio value="1">{t('common.common.option1', 'Option 1')}</Radio>
              <Radio value="2">{t('common.common.option2', 'Option 2')}</Radio>
            </RadioGroup>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.read_only', 'Read-only')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.read_only_true', 'readOnly: true')}>
            <RadioGroup defaultValue="1" readOnly>
              <Radio value="1">{t('common.common.option1', 'Option 1')}</Radio>
              <Radio value="2">{t('common.common.option2', 'Option 2')}</Radio>
            </RadioGroup>
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(RadioShowcase);
