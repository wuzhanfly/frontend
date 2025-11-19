/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { CollapsibleDetails, CollapsibleList } from 'toolkit/chakra/collapsible';

import { Section, Container, SectionHeader, SamplesStack, Sample, SectionSubHeader } from './parts';

const TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const CollapsibleShowcase = () => {
  const { t } = useTranslation();
  return (
    <Container value="collapsible">
      <Section>
        <SectionHeader>{t('common.common.variant', 'Variant')}</SectionHeader>
        <SamplesStack >
          <Sample label={t('common.common.variant_default', 'variant: default')} flexDirection="column" alignItems="flex-start">
            <CollapsibleDetails id="CutLink_1">
              <Box maxW="500px">{ TEXT }</Box>
            </CollapsibleDetails>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.loading', 'Loading')}</SectionHeader>
        <SamplesStack >
          <Sample label={t('common.common.loading_true', 'loading: true')} flexDirection="column" alignItems="flex-start">
            <CollapsibleDetails id="CutLink_2" loading>
              <Box maxW="500px">{ TEXT }</Box>
            </CollapsibleDetails>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.examples', 'Examples')}</SectionHeader>

        <SectionSubHeader>{t('common.common.cut_link', 'Cut link')}</SectionSubHeader>
        <SamplesStack>
          <Sample label={t('common.common.show_details')} flexDirection="column" alignItems="flex-start">
            <CollapsibleDetails id="CutLink_3">
              <Box maxW="500px">{ TEXT }</Box>
            </CollapsibleDetails>
          </Sample>
          <Sample label={t('common.common.expand_all_list')} flexDirection="row" alignItems="flex-start" flexWrap="nowrap">
            <CollapsibleList
              items={ [ 'foo', 'bar', 'baz', 'qux', 'quux', 'corge', 'grault', 'garply', 'waldo', 'fred', 'plugh', 'xyzzy', 'thud' ] }
              renderItem={ (item) => <Text>{ item }</Text> }
            />
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(CollapsibleShowcase);
