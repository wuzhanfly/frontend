import { Box } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Badge } from 'toolkit/chakra/badge';
import IconSvg from 'ui/shared/IconSvg';
import StatusTag from 'ui/shared/statusTag/StatusTag';

import { Section, Container, SectionHeader, SamplesStack, Sample, SectionSubHeader } from './parts';

const BadgeShowcase = () => {
  const { t } = useTranslation();
  return (
    <Container value="badge">
      <Section>
        <SectionHeader>{t('common.common.color_palette', 'Color palette')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.colorpalette_gray', 'colorPalette: gray')}>
            <Badge colorPalette="gray">{t('common.common.pending', 'Pending')}</Badge>
          </Sample>
          <Sample label={t('common.common.colorpalette_green', 'colorPalette: green')}>
            <Badge colorPalette="green">{t('common.common.success', 'Success')}</Badge>
          </Sample>
          <Sample label={t('common.common.colorpalette_red', 'colorPalette: red')}>
            <Badge colorPalette="red">{t('common.common.failed', 'Failed')}</Badge>
          </Sample>
          <Sample label={t('common.common.colorpalette_purple', 'colorPalette: purple')}>
            <Badge colorPalette="purple">{t('common.common.transaction', 'Transaction')}</Badge>
          </Sample>
          <Sample label={t('common.common.colorpalette_orange', 'colorPalette: orange')}>
            <Badge colorPalette="orange">{t('common.common.token_transfer', 'Token transfer')}</Badge>
          </Sample>
          <Sample label={t('common.common.colorpalette_blue', 'colorPalette: blue')}>
            <Badge colorPalette="blue">{t('common.common.contract_call', 'Contract call')}</Badge>
          </Sample>
          <Sample label={t('common.common.colorpalette_yellow', 'colorPalette: yellow')}>
            <Badge colorPalette="yellow">{t('common.common.blob_txn', 'Blob txn')}</Badge>
          </Sample>
          <Sample label={t('common.common.colorpalette_teal', 'colorPalette: teal')}>
            <Badge colorPalette="teal">{t('common.common.multicall', 'Multicall')}</Badge>
          </Sample>
          <Sample label={t('common.common.colorpalette_cyan', 'colorPalette: cyan')}>
            <Badge colorPalette="cyan">{t('common.common.internal_txn', 'Internal txn')}</Badge>
          </Sample>
          <Sample label={t('common.common.colorpalette_purple_alt', 'colorPalette: purple_alt')}>
            <Badge colorPalette="purple_alt">{t('common.common.read', 'read')}</Badge>
          </Sample>
          <Sample label={t('common.common.colorpalette_blue_alt', 'colorPalette: blue_alt')}>
            <Badge colorPalette="blue_alt">{t('common.common.write', 'write')}</Badge>
          </Sample>
        </SamplesStack>
      </Section>
      <Section>
        <SectionHeader>{t('common.common.loading', 'Loading')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.loading_true', 'loading: true')}>
            <Badge colorPalette="purple" loading>{t('common.common.content', 'Content')}</Badge>
          </Sample>
        </SamplesStack>
      </Section>
      <Section>
        <SectionHeader>{t('common.common.size', 'Size')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.size_md', 'size: md')}>
            <Badge size="md">{t('common.common.content', 'Content')}</Badge>
          </Sample>
          <Sample label={t('common.common.size_sm', 'size: sm')}>
            <Badge size="sm">{t('common.common.content', 'Content')}</Badge>
          </Sample>
        </SamplesStack>
      </Section>
      <Section>
        <SectionHeader>{t('common.common.variant', 'Variant')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.variant_subtle', 'variant: subtle')}>
            <Badge variant="subtle">{t('common.common.content', 'Content')}</Badge>
          </Sample>
        </SamplesStack>
      </Section>
      <Section>
        <SectionHeader>{t('common.common.truncate', 'Truncate')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.truncated_true', 'truncated: true')}>
            <Box maxW="150px">
              <Badge truncated>
                {t('common.common.very_long_content_that_should_be_truncated', 'Very long content that should be truncated')}
              </Badge>
            </Box>
          </Sample>
        </SamplesStack>
      </Section>
      <Section>
        <SectionHeader>{t('common.common.icon', 'Icon')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.iconstart_status_success', 'iconStart: status/success')}>
            <Badge startElement={ <IconSvg name="status/success" boxSize={ 2.5 }/> }>
              {t('common.common.content', 'Content')}
            </Badge>
          </Sample>
        </SamplesStack>
      </Section>
      <Section>
        <SectionHeader>{t('common.common.examples', 'Examples')}</SectionHeader>
        <SectionSubHeader>{t('common.common.status_tag_statustag', 'Status tag (StatusTag)')}</SectionSubHeader>
        <SamplesStack>
          <Sample label="status: ok">
            <StatusTag type="ok" text={t('shared.common.text')}/>
          </Sample>
          <Sample label="status: error">
            <StatusTag type="error" text={t('shared.common.text')}/>
          </Sample>
          <Sample label="status: pending">
            <StatusTag type="pending" text={t('shared.common.text')}/>
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(BadgeShowcase);
