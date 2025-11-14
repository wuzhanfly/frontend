import React from 'react';
import { useTranslation } from 'react-i18next';

import { Field } from 'toolkit/chakra/field';
import { Input } from 'toolkit/chakra/input';

import { Section, Container, SectionHeader, SamplesStack, Sample, SectionSubHeader } from './parts';

const FieldShowcase = () => {
  const { t } = useTranslation();
  return (
    <Container value="field">
      <Section>
        <SectionHeader>Size</SectionHeader>
        <SectionSubHeader>Default</SectionSubHeader>
        <SamplesStack>
          { ([ 'sm', 'md', 'lg' ] as const).map((size) => (
            <Sample label={ `size: ${ size }` } w="100%" key={ size } alignItems="flex-start">
              <Field label={t('common.common.email')} required size={ size } helperText={t('common.common.helper_text')} maxWidth="200px">
                <Input/>
              </Field>
              <Field label="Email (disabled)" required size={ size } maxWidth="200px">
                <Input disabled value={t('common.common.meexamplecom')}/>
              </Field>
              <Field label="Email (readOnly)" required size={ size } maxWidth="200px">
                <Input readOnly value={t('common.common.meexamplecom')}/>
              </Field>
              <Field label="Email (invalid)" required size={ size } errorText={t('common.common.something_went_wrong')} invalid maxWidth="200px">
                <Input value="duck"/>
              </Field>
            </Sample>
          )) }

          <Sample label="size: xl" w="100%" alignItems="flex-start">
            <Field label={t('common.common.email')} required floating size="lg" helperText={t('common.common.helper_text')} maxWidth="300px">
              <Input/>
            </Field>
            <Field label="Email (disabled)" required floating disabled size="lg" maxWidth="300px">
              <Input value={t('common.common.meexamplecom')}/>
            </Field>
            <Field label="Email (readOnly)" required floating readOnly size="lg" maxWidth="300px">
              <Input value={t('common.common.meexamplecom')}/>
            </Field>
            <Field label="Email (invalid)" required floating size="lg" errorText={t('common.common.something_went_wrong')} invalid maxWidth="300px">
              <Input value="duck"/>
            </Field>
          </Sample>
        </SamplesStack>

        <SectionSubHeader>On custom background</SectionSubHeader>
        <SamplesStack>
          <Sample label={t('common.common.no_floating_label')} p={ 4 } bgColor={{ _light: 'blackAlpha.200', _dark: 'whiteAlpha.200' }} alignItems="flex-start">
            <Field label={t('common.common.email')} required helperText={t('common.common.helper_text')} maxWidth="200px">
              <Input/>
            </Field>
            <Field label="Email (disabled)" required disabled maxWidth="200px">
              <Input value={t('common.common.meexamplecom')}/>
            </Field>
            <Field label="Email (readOnly)" required readOnly maxWidth="200px">
              <Input value={t('common.common.meexamplecom')}/>
            </Field>
            <Field label="Email (invalid)" required errorText={t('common.common.something_went_wrong')} invalid maxWidth="200px">
              <Input value="duck"/>
            </Field>
          </Sample>
          <Sample label="floating label" p={ 4 } bgColor={{ _light: 'blackAlpha.200', _dark: 'whiteAlpha.200' }} alignItems="flex-start">
            <Field label={t('common.common.email')} required floating size="lg" helperText={t('common.common.helper_text')} maxWidth="300px">
              <Input/>
            </Field>
            <Field label="Email (disabled)" required disabled floating size="lg" maxWidth="300px">
              <Input value={t('common.common.meexamplecom')}/>
            </Field>
            <Field label="Email (readOnly)" required readOnly floating size="lg" maxWidth="300px">
              <Input value={t('common.common.meexamplecom')}/>
            </Field>
            <Field label="Email (invalid)" required floating size="lg" errorText={t('common.common.something_went_wrong')} invalid maxWidth="300px">
              <Input value="duck"/>
            </Field>
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(FieldShowcase);
