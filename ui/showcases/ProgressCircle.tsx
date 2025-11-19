import React from 'react';
import { useTranslation } from 'react-i18next';

import { ProgressCircleRoot, ProgressCircleRing, ProgressCircleValueText } from 'toolkit/chakra/progress-circle';

import { Section, Container, SectionHeader, SamplesStack, Sample } from './parts';

const ProgressCircleShowcase = () => {
  const { t } = useTranslation();

  return (
    <Container value="progress-circle">
      <Section>
        <SectionHeader>{t('common.common.showcase.progress_circle.variant')}</SectionHeader>
        <SamplesStack >
          <Sample label={t('common.common.showcase.progress_circle.color_palette_blue', 'colorPalette: blue')}>
            <ProgressCircleRoot
              value={ 45 }
              colorPalette="blue"
            >
              <ProgressCircleRing/>
            </ProgressCircleRoot>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.showcase.progress_circle.size')}</SectionHeader>
        <SamplesStack >
          { ([ 'sm', 'md', 'lg' ] as const).map((size) => (
            <Sample key={ size } label={ t('common.common.showcase.progress_circle.size_value', 'size: {{size}}', { size }) }>
              <ProgressCircleRoot
                value={ 45 }
                colorPalette="blue"
                size={ size }
              >
                <ProgressCircleRing/>
                { size === 'lg' && <ProgressCircleValueText/> }
              </ProgressCircleRoot>
            </Sample>
          )) }
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(ProgressCircleShowcase);
