import { Box, createListCollection } from '@chakra-ui/react';
import { noop } from 'es-toolkit';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox } from 'toolkit/chakra/checkbox';
import type { SelectOption } from 'toolkit/chakra/select';
import { Select, SelectAsync } from 'toolkit/chakra/select';
import PopoverFilterRadio from 'ui/shared/filters/PopoverFilterRadio';
import IconSvg from 'ui/shared/IconSvg';
import Sort from 'ui/shared/sort/Sort';
import TokenTransferFilter from 'ui/shared/TokenTransfer/TokenTransferFilter';
import { getSortOptions } from 'ui/txs/useTxsSort';

import { Section, Container, SectionHeader, SamplesStack, Sample, SectionSubHeader } from './parts';

const getFrameworks = (t: (key: string) => string) => createListCollection<SelectOption>({
  items: [
    { label: 'React.js is the most popular framework', value: 'react', icon: <IconSvg name="API" boxSize={ 5 } flexShrink={ 0 }/> },
    { label: 'Vue.js is the second most popular framework', value: 'vue' },
    { value: 'angular', label: t('common.common.angular'), renderLabel: () => <div>Angular is <Box as="span" color="red" fontWeight="700">not awesome</Box></div> },
    { label: t('common.common.svelte'), value: 'svelte' },
  ],
});

const SelectShowcase = () => {
  const { t } = useTranslation();
  const txSortingOptions = createListCollection<SelectOption>({
    items: getSortOptions(t),
  });
  const frameworks = getFrameworks(t);

  const [ value, setValue ] = React.useState<SelectOption['value'] | undefined>();
  const [ values, setValues ] = React.useState<Array<SelectOption['value']>>([]);
  const [ value2, setValue2 ] = React.useState<SelectOption['value'] | undefined>();
  const [ values2, setValues2 ] = React.useState<Array<SelectOption['value']>>([]);

  const handleSingleChange = React.useCallback((v: SelectOption['value'] | undefined) => {
    setValue(v);
  }, []);

  const handleMultipleChange = React.useCallback((v: Array<SelectOption['value']>) => {
    setValues(v);
  }, []);

  const handleSingleChange2 = React.useCallback((v: SelectOption['value'] | undefined) => {
    setValue2(v);
  }, []);

  const handleMultipleChange2 = React.useCallback((v: Array<SelectOption['value']>) => {
    setValues2(v);
  }, []);

  const handleFetch = React.useCallback(() => {
    return Promise.resolve(frameworks);
  }, [frameworks]);
  
  return (
    <Container value="select">
      <Section>
        <SectionHeader>Variant</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.with_icon')}>
            <Select collection={ frameworks } placeholder={t('common.common.select_framework')} w="200px"/>
          </Sample>
          <Sample label={t('common.common.without_icon')}>
            <Select collection={ frameworks } placeholder={t('common.common.select_framework')} w="200px"/>
          </Sample>
          <Sample label={t('common.common.multiple')}>
            <Select collection={ frameworks } placeholder={t('common.common.select_framework')} w="200px" multiple defaultValue={[ frameworks.items[0].value ]}/>
          </Sample>
          <Sample label={t('common.common.with_icon_and_multiple')}>
            <Select collection={ frameworks } placeholder={t('common.common.select_framework')} w="200px" multiple defaultValue={[ frameworks.items[0].value ]}/>
          </Sample>
          <Sample label={t('common.common.multiple_with_checkboxes')}>
            <Select collection={ frameworks } placeholder={t('common.common.select_framework')} w="200px" multiple/>
          </Sample>
          <Sample label={t('common.common.async')}>
            <SelectAsync
              loadOptions={ handleFetch }
              placeholder={t('common.common.select_framework')}
              w="200px"
            />
          </Sample>
        </SamplesStack>

        <SectionHeader>Size</SectionHeader>
        <SamplesStack>
          <Sample label="size: md">
            <Select collection={ frameworks } placeholder={t('common.common.select_framework')} w="200px"/>
          </Sample>
          <Sample label="size: sm">
            <Select collection={ frameworks } placeholder={t('common.common.select_framework')} w="200px" size="sm"/>
          </Sample>
        </SamplesStack>

        <SectionHeader>Disabled</SectionHeader>
        <SamplesStack>
          <Sample label={t('validators.common.default')}>
            <Select collection={ frameworks } placeholder={t('common.common.select_framework')} w="200px" disabled/>
          </Sample>
          <Sample label={t('common.common.multiple')}>
            <Select collection={ frameworks } placeholder={t('common.common.select_framework')} w="200px" multiple defaultValue={[ frameworks.items[0].value ]} disabled/>
          </Sample>
          <Sample label={t('common.common.async')}>
            <SelectAsync
              loadOptions={ handleFetch }
              placeholder={t('common.common.select_framework')}
              w="200px"
              disabled
            />
          </Sample>
        </SamplesStack>

        <SectionSubHeader>Sort component</SectionSubHeader>
        <SamplesStack>
          <Sample label={t('validators.common.default')} vertical>
            <Sort collection={ txSortingOptions } onChange={ noop }/>
          </Sample>
        </SamplesStack>

        <SectionSubHeader>Filter components</SectionSubHeader>
        <SamplesStack>
          <Sample label={t('validators.common.default')} vertical>
            <PopoverFilterRadio
              name="status"
              collection={ frameworks }
              hasActiveFilter={ false }
              onChange={ noop }
            />
          </Sample>
          
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(SelectShowcase);
