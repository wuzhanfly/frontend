import React from 'react';
import { useTranslation } from 'react-i18next';

import { Tooltip } from 'toolkit/chakra/tooltip';
import Utilization from 'ui/shared/Utilization/Utilization';

import { Section, Container, SectionHeader, SamplesStack, Sample } from './parts';

const TooltipShowcase = () => {
  const { t } = useTranslation();
  return (
    <Container value="tooltip">
      <Section>
        <SectionHeader>{t('common.common.variant', 'Variant')}</SectionHeader>
        <SamplesStack>
          <Sample label="variant: regular">
            <Tooltip content={t('common.common.tooltip_content')}>
              <span>{t('common.common.default', 'Default')}</span>
            </Tooltip>
            <Tooltip content={t('common.common.tooltip_content')} interactive>
              <Utilization value={ 0.5 }/>
            </Tooltip>
          </Sample>
          <Sample label="variant: popover">
            <Tooltip content={t('common.common.tooltip_content')} variant="popover">
              <span>{t('common.common.default', 'Default')}</span>
            </Tooltip>
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(TooltipShowcase);
