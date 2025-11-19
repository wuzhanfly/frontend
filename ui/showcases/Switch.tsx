import React from 'react';
import { useTranslation } from 'react-i18next';

import { Switch } from 'toolkit/chakra/switch';

import { Section, Container, SectionHeader, SamplesStack, Sample } from './parts';

const SwitchShowcase = () => {
  const { t } = useTranslation();

  return (
    <Container value="switch">
      <Section>
        <SectionHeader>{t('common.common.showcase.switch.size')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.size_sm', 'size: sm')}>
            <Switch size="sm">
              {t('common.common.show_duck', 'Show duck')}
            </Switch>
          </Sample>
          <Sample label={t('common.common.size_md', 'size: md')}>
            <Switch size="md">
              {t('common.common.show_duck', 'Show duck')}
            </Switch>
          </Sample>
          <Sample label={t('common.common.size_lg', 'size: lg')}>
            <Switch size="lg" defaultChecked>
              {t('common.common.show_duck', 'Show duck')}
            </Switch>
          </Sample>
        </SamplesStack>
      </Section>
      <Section>
        <SectionHeader>{t('common.common.showcase.switch.disabled')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.disabled_true', 'disabled: true')}>
            <Switch disabled>
              {t('common.common.show_duck', 'Show duck')}
            </Switch>
          </Sample>
        </SamplesStack>
      </Section>
      <Section>
        <SectionHeader>{t('common.common.showcase.switch.direction')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.direction_rtl', 'direction: rtl')}>
            <Switch size="sm" direction="rtl">
              {t('common.common.show_duck', 'Show duck')}
            </Switch>
          </Sample>
          <Sample label={t('common.common.direction_ltr', 'direction: ltr')}>
            <Switch size="md" direction="ltr">
              {t('common.common.show_duck', 'Show duck')}
            </Switch>
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(SwitchShowcase);
