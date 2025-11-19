import React from 'react';
import { useTranslation } from 'react-i18next';

import { Skeleton } from 'toolkit/chakra/skeleton';

import { Section, Container, SectionHeader, SamplesStack, Sample } from './parts';

const SkeletonShowcase = () => {
  const { t } = useTranslation();

  return (
    <Container value="skeleton">
      <Section>
        <SectionHeader>{t('common.common.variants', 'Variants')}</SectionHeader>
        <SamplesStack >
          <Sample label={t('common.common.default', 'default')}>
            <Skeleton loading>
              <span>{t('common.common.skeleton', 'Skeleton')}</span>
            </Skeleton>
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(SkeletonShowcase);
