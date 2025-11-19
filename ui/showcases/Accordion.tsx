import React from 'react';
import { useTranslation } from 'react-i18next';

import { AccordionItemContent, AccordionItemTrigger, AccordionItem, AccordionRoot } from 'toolkit/chakra/accordion';

import { Section, Container, SectionHeader, SamplesStack, Sample } from './parts';

const getItems = (t: (key: string) => string) => [
  { value: 'first-item', title: t('common.common.first_item'), text: t('common.common.some_value_1') },
  { value: 'second-item', title: t('common.common.second_item'), text: t('common.common.some_value_2') },
  { value: 'third-item', title: t('common.common.third_item'), text: t('common.common.some_value_3') },
];

// https://eth-sepolia.k8s-dev.blockscout.com/address/0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC?tab=read_write_contract
// https://base.blockscout.com/token/0x8f9C456C928a33a3859Fa283fb57B23c908fE843/instance/1924977?tab=metadata

const AccordionShowcase = () => {
  const { t } = useTranslation();
  const items = getItems(t);
  return (
    <Container value="accordion">
      <Section>
        <SectionHeader>{t('common.common.variant', 'Variant')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.variant_outline', 'variant: outline')}>
            <AccordionRoot w="400px">
              { items.map((item, index) => (
                <AccordionItem key={ index } value={ item.value }>
                  <AccordionItemTrigger>{ item.title }</AccordionItemTrigger>
                  <AccordionItemContent>{ item.text }</AccordionItemContent>
                </AccordionItem>
              )) }
            </AccordionRoot>
          </Sample>
          <Sample label={t('common.common.variant_faq', 'variant: faq')}>
            <AccordionRoot w="400px" variant="faq">
              { items.map((item, index) => (
                <AccordionItem key={ index } value={ item.value }>
                  <AccordionItemTrigger variant="faq">{ item.title }</AccordionItemTrigger>
                  <AccordionItemContent>{ item.text }</AccordionItemContent>
                </AccordionItem>
              )) }
            </AccordionRoot>
          </Sample>
        </SamplesStack>

        <SectionHeader>{t('common.common.size', 'Size')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.size_md', 'size: md')}>
            <AccordionRoot w="400px">
              { items.map((item, index) => (
                <AccordionItem key={ index } value={ item.value }>
                  <AccordionItemTrigger>{ item.title }</AccordionItemTrigger>
                  <AccordionItemContent>{ item.text }</AccordionItemContent>
                </AccordionItem>
              )) }
            </AccordionRoot>
          </Sample>
          <Sample label={t('common.common.size_sm', 'size: sm')}>
            <AccordionRoot w="400px" size="sm">
              { items.map((item, index) => (
                <AccordionItem key={ index } value={ item.value }>
                  <AccordionItemTrigger indicatorPlacement="start">{ item.title }</AccordionItemTrigger>
                  <AccordionItemContent>{ item.text }</AccordionItemContent>
                </AccordionItem>
              )) }
            </AccordionRoot>
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(AccordionShowcase);
