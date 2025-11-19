import React from 'react';
import { useTranslation } from 'react-i18next';

import { Rating } from 'toolkit/chakra/rating';

import { Section, Container, SectionHeader, SamplesStack, Sample } from './parts';

const RatingShowcase = () => {
  const { t } = useTranslation();
  return (
    <Container value="rating">
      <Section>
        <SectionHeader>{t('common.common.size', 'Size')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.showcase.rating.size_md', 'size: md')}>
            <Rating defaultValue={ 3 } label={ [ t('marketplace.common.very_bad'), t('marketplace.common.bad'), t('marketplace.common.average'), t('marketplace.common.good'), t('marketplace.common.excellent') ] }/>
          </Sample>
        </SamplesStack>
      </Section>
      <Section>
        <SectionHeader>{t('common.common.read_only', 'Read-only')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.showcase.rating.readonly_true', 'readOnly: true')}>
            <Rating defaultValue={ 3 } label={ [ t('marketplace.common.very_bad'), t('marketplace.common.bad'), t('marketplace.common.average'), t('marketplace.common.good'), t('marketplace.common.excellent') ] } readOnly/>
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(RatingShowcase);
