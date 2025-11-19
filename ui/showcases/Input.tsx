import React from 'react';
import { useTranslation } from 'react-i18next';

import { Field } from 'toolkit/chakra/field';
import { Input } from 'toolkit/chakra/input';
import { InputGroup } from 'toolkit/chakra/input-group';
import { FilterInput } from 'toolkit/components/filters/FilterInput';
import IconSvg from 'ui/shared/IconSvg';

import { Section, Container, SectionHeader, SamplesStack, Sample, SectionSubHeader } from './parts';

const InputShowcase = () => {
  const { t } = useTranslation();
  return (
    <Container value="input">
      <Section>
        <SectionHeader>{t('common.common.size', 'Size')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.size_sm', 'size: sm')}>
            <Input type="text" placeholder={t('validators.common.name')} size="sm"/>
          </Sample>
          <Sample label={t('common.common.size_md', 'size: md')}>
            <Input type="text" placeholder={t('validators.common.name')} size="md"/>
          </Sample>
          <Sample label={t('common.common.size_lg', 'size: lg')}>
            <Input type="text" placeholder={t('validators.common.name')} size="lg"/>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.variant', 'Variant')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.variant_outline', 'variant: outline')} maxW="300px">
            <Input type="text" placeholder={t('validators.common.name')}/>
            <Input type="text" placeholder={t('common.common.name_disabled', 'Name (disabled)')} disabled/>
            <Input type="text" placeholder={t('common.common.name_readonly', 'Name (readOnly)')} readOnly/>
            <Input type="text" placeholder={t('common.common.name_invalid', 'Name (invalid)')} data-invalid/>
            <Input type="text" placeholder={t('common.common.name_invalid', 'Name (invalid)')} data-invalid value="duck"/>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.input_group', 'Input group')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.with_end_element')}>
            <Field label={t('dashboard.common.referral_code')} required floating size="lg" w="300px" flexShrink={ 0 }>
              <InputGroup endElement={ <IconSvg name="copy" boxSize={ 5 }/> } endElementProps={{ px: 3 }}>
                <Input/>
              </InputGroup>
            </Field>
          </Sample>
          <Sample label={t('common.common.with_start_element')}>
            <InputGroup startElement={ <IconSvg name="collection" boxSize={ 5 }/> } startElementProps={{ px: 2 }}>
              <Input placeholder={t('common.common.type_in_something', 'Type in something')}/>
            </InputGroup>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.examples', 'Examples')}</SectionHeader>
        <SectionSubHeader>{t('common.common.filter_input', 'Filter input')}</SectionSubHeader>
        <SamplesStack>
          <Sample>
            <FilterInput placeholder={t('common.common.search_by_method_name')}/>
            <FilterInput placeholder={t('common.common.search_by_method_name')} loading/>
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(InputShowcase);
