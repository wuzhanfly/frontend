import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'toolkit/chakra/button';
import { PopoverRoot, PopoverTrigger, PopoverContent, PopoverBody } from 'toolkit/chakra/popover';

import { Section, Container, SectionHeader, SamplesStack, Sample } from './parts';

const PopoverShowcase = () => {
  const { t } = useTranslation();

  return (
    <Container value="popover">
      <Section>
        <SectionHeader>{t('common.common.size', 'Size')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.size_sm', 'size: sm')}>
            <PopoverRoot>
              <PopoverTrigger>
                <Button variant="dropdown">{t('common.common.trigger', 'Trigger')}</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody>
                  {t('common.common.popover_content', 'Popover content')}
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(PopoverShowcase);
