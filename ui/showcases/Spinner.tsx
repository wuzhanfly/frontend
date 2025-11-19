import { Spinner } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Section, Container, SectionHeader, SamplesStack, Sample, SectionSubHeader } from './parts';

const SpinnerShowcase = () => {
  const { t } = useTranslation();

  return (
    <Container value="spinner">
      <Section>
        <SectionHeader>{t('common.common.spinner', 'Spinner')}</SectionHeader>
        <SectionSubHeader>{t('common.common.sizes', 'Sizes')}</SectionSubHeader>
        <SamplesStack>
          { ([ 'xs', 'sm', 'md', 'lg', 'xl' ] as const).map((size) => (
            <Sample key={ size } label={t('common.common.size', 'size: ') + size}>
              <Spinner size={ size }/>
            </Sample>
          )) }
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(SpinnerShowcase);
