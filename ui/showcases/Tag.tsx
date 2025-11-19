import React from 'react';
import { useTranslation } from 'react-i18next';

import * as addressMetadataMock from 'mocks/metadata/address';
import { Tag } from 'toolkit/chakra/tag';
import EntityTag from 'ui/shared/EntityTags/EntityTag';

import { Section, Container, SectionHeader, SamplesStack, Sample, SectionSubHeader } from './parts';

const TagShowcase = () => {
  const { t } = useTranslation();
  return (
    <Container value="tag">
      <Section>
        <SectionHeader>{t('common.common.variant')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.variant_subtle')}>
            <Tag>My tag</Tag>
          </Sample>
          <Sample label={t('common.common.showcase.tag.variant_clickable')}>
            <Tag variant="clickable">My tag</Tag>
          </Sample>
          <Sample label={t('common.common.showcase.tag.variant_filter')}>
            <Tag variant="filter">My tag</Tag>
          </Sample>
          <Sample label={t('common.common.showcase.tag.variant_select')}>
            <Tag variant="select">Default</Tag>
            <Tag variant="select" selected>Selected</Tag>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.size')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.size_md')}>
            <Tag size="md">My tag</Tag>
          </Sample>
          <Sample label={t('common.common.size_lg')}>
            <Tag size="lg">My tag</Tag>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.truncated')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.showcase.tag.truncated_true')}>
            <Tag maxW="150px" truncated>Very very very very very looooooonggggg text</Tag>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.closable')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.showcase.tag.closable_true')}>
            <Tag closable>My tag</Tag>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.loading')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.showcase.tag.loading_true')}>
            <Tag loading>My tag</Tag>
            <Tag maxW="150px" truncated loading>Very very very very very looooooonggggg text</Tag>
          </Sample>
          <Sample label={t('common.common.showcase.tag.loading_false')}>
            <Tag>My tag</Tag>
            <Tag maxW="150px" truncated>Very very very very very looooooonggggg text</Tag>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>Examples</SectionHeader>
        <SectionSubHeader>{t('common.common.showcase.tag.public_tags')}</SectionSubHeader>
        <SamplesStack>
          <Sample>
            <EntityTag data={ addressMetadataMock.nameTag }/>
            <EntityTag data={ addressMetadataMock.customNameTag }/>
            <EntityTag data={ addressMetadataMock.warpcastTag }/>
            <EntityTag data={ addressMetadataMock.genericTag }/>
            <EntityTag data={ addressMetadataMock.protocolTag }/>
            <EntityTag data={ addressMetadataMock.infoTagWithLink } maxW="150px"/>
            <EntityTag data={ addressMetadataMock.tagWithTooltip }/>
            <EntityTag data={ addressMetadataMock.nameTag } isLoading/>
          </Sample>
        </SamplesStack>

        <SectionSubHeader>{t('common.common.showcase.tag.filter_tags')}</SectionSubHeader>
        <SamplesStack>
          <Sample>
            <Tag variant="filter" label="Type">{t('common.common.all')}</Tag>
            <Tag variant="filter" label={t('validators.common.address')} truncated maxW="150px" closable>0x1234567890123456789012345678901234567890</Tag>
            <Tag variant="filter" label="Type" loading>{t('common.common.all')}</Tag>
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(TagShowcase);
