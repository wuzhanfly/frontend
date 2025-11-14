import { Box } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'toolkit/chakra/tabs';
import AdaptiveTabs from 'toolkit/components/AdaptiveTabs/AdaptiveTabs';

import { Section, Container, SectionHeader, SamplesStack, Sample, SectionSubHeader } from './parts';

const TabsShowcase = () => {
  const { t } = useTranslation();
  const tabs = [
    { id: 'tab1', title: t('common.common.swaps'), component: <div>Swaps content</div>, count: 10 },
    { id: 'tab2', title: t('common.common.bridges'), component: <div>Bridges content</div>, count: 0 },
    { id: 'tab3', title: t('common.common.liquidity_staking'), component: <div>Liquidity staking content</div>, count: 300 },
    { id: 'tab4', title: t('common.common.lending'), component: <div>Lending content</div>, count: 400 },
    { id: 'tab5', title: t('common.common.yield_farming'), component: <div>Yield farming content</div> },
  ];

  return (
    <Container value="tabs">
      <Section>
        <SectionHeader>{t('common.common.showcase.tabs.variants')}</SectionHeader>
        <SamplesStack>
          <Sample label="variant: solid">
            <TabsRoot defaultValue="tab1" variant="solid">
              <TabsList>
                <TabsTrigger value="tab1">{t('common.common.showcase.tabs.first_tab')}</TabsTrigger>
                <TabsTrigger value="tab2">{t('common.common.showcase.tabs.second_tab')}</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">{t('common.common.showcase.tabs.first_tab_content')}</TabsContent>
              <TabsContent value="tab2">{t('common.common.showcase.tabs.second_tab_content')}</TabsContent>
            </TabsRoot>
          </Sample>
          <Sample label="variant: secondary">
            <TabsRoot defaultValue="tab1" variant="secondary" size="sm">
              <TabsList>
                <TabsTrigger value="tab1">{t('common.common.showcase.tabs.first_tab')}</TabsTrigger>
                <TabsTrigger value="tab2">{t('common.common.showcase.tabs.second_tab')}</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">{t('common.common.showcase.tabs.first_tab_content')}</TabsContent>
              <TabsContent value="tab2">{t('common.common.showcase.tabs.second_tab_content')}</TabsContent>
            </TabsRoot>
          </Sample>
          <Sample label="variant: segmented">
            <TabsRoot defaultValue="tab1" variant="segmented" size="sm">
              <TabsList>
                <TabsTrigger value="tab1">{t('common.common.showcase.tabs.first_tab')}</TabsTrigger>
                <TabsTrigger value="tab2">{t('common.common.showcase.tabs.second_tab')}</TabsTrigger>
                <TabsTrigger value="tab3">{t('common.common.showcase.tabs.third_tab')}</TabsTrigger>
                <TabsTrigger value="tab4">{t('common.common.showcase.tabs.fourth_tab')}</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">{t('common.common.showcase.tabs.first_tab_content')}</TabsContent>
              <TabsContent value="tab2">{t('common.common.showcase.tabs.second_tab_content')}</TabsContent>
              <TabsContent value="tab3">{t('common.common.showcase.tabs.third_tab_content')}</TabsContent>
              <TabsContent value="tab4">{t('common.common.showcase.tabs.fourth_tab_content')}</TabsContent>
            </TabsRoot>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.showcase.tabs.examples')}</SectionHeader>

        <SectionSubHeader>{t('common.common.showcase.tabs.adaptive_tabs')}</SectionSubHeader>
        <SamplesStack>
          <Sample gridColumn="1 / 3" w="100%" maxW={{ base: '100vw', lg: '700px' }}>
            <AdaptiveTabs
              w="100%"
              tabs={ tabs }
              defaultValue={ tabs[0].id }
              outline="1px dashed lightpink"
              leftSlot={ <Box display={{ base: 'none', lg: 'block' }}>{t('common.common.showcase.tabs.left_element')}</Box> }
              leftSlotProps={{ pr: { base: 0, lg: 4 }, color: 'text.secondary' }}
              rightSlot={ <Box display={{ base: 'none', lg: 'flex' }} justifyContent="space-between"><span>Right element</span><span>🙈</span></Box> }
              rightSlotProps={{ pl: { base: 0, lg: 4 }, color: 'text.secondary', widthAllocation: 'available' }}
            />
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(TabsShowcase);
