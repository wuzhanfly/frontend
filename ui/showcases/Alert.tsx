import { Box } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Alert } from 'toolkit/chakra/alert';
import { Link } from 'toolkit/chakra/link';
import { TableBody, TableColumnHeader, TableHeader, TableRoot, TableRow } from 'toolkit/chakra/table';
import * as SocketNewItemsNotice from 'ui/shared/SocketNewItemsNotice';
import TxPendingAlert from 'ui/tx/TxPendingAlert';

import { Section, Container, SectionHeader, SamplesStack, Sample, SectionSubHeader } from './parts';

const AlertShowcase = () => {
  const { t } = useTranslation();
  return (
    <Container value="alert">
      <Section>
        <SectionHeader>{t('common.common.status', 'Status')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.status_info', 'status: info')}>
            <Alert status="info" title={t('common.common.info', 'Info')}> {t('common.common.alert_content', 'Alert content')} </Alert>
          </Sample>
          <Sample label={t('common.common.status_warning', 'status: warning')}>
            <Alert status="warning" title={t('common.common.warning', 'Warning')}> {t('common.common.alert_content', 'Alert content')} </Alert>
          </Sample>
          <Sample label={t('common.common.status_success', 'status: success')}>
            <Alert status="success" title={t('common.common.success', 'Success')}> {t('common.common.alert_content', 'Alert content')} </Alert>
          </Sample>
          <Sample label={t('common.common.status_error', 'status: error')}>
            <Alert status="error" title={t('common.common.error', 'Error')}> {t('common.common.alert_content', 'Alert content')} </Alert>
          </Sample>
        </SamplesStack>
      </Section>
      <Section>
        <SectionHeader>{t('common.common.variant', 'Variant')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.variant_subtle', 'variant: subtle')}>
            <Alert status="info" title={t('common.common.info', 'Info')} showIcon> {t('common.common.alert_content', 'Alert content')} </Alert>
          </Sample>
        </SamplesStack>
      </Section>
      <Section>
        <SectionHeader>{t('common.common.size', 'Size')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.size_sm', 'size: sm')}>
            <Alert status="info" title={t('common.common.info', 'Info')} showIcon size="sm" closable> {t('common.common.alert_content', 'Alert content')} </Alert>
          </Sample>
          <Sample label={t('common.common.size_md', 'size: md')}>
            <Alert status="info" title={t('common.common.info', 'Info')} showIcon size="md"> {t('common.common.alert_content', 'Alert content')} </Alert>
          </Sample>
        </SamplesStack>
      </Section>
      <Section>
        <SectionHeader>{t('common.common.closable', 'Closable')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.closable', 'closable')}>
            <Alert status="info" title={t('common.common.info', 'Info')} showIcon closable> {t('common.common.alert_content', 'Alert content')} </Alert>
          </Sample>
        </SamplesStack>
      </Section>
      <Section>
        <SectionHeader>{t('common.common.loading', 'Loading')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.loading_true', 'loading: true')}>
            <Alert status="info" title={t('common.common.info', 'Info')} loading> {t('common.common.alert_content', 'Alert content')} </Alert>
          </Sample>
        </SamplesStack>
      </Section>
      <Section>
        <SectionHeader>{t('common.common.examples', 'Examples')}</SectionHeader>
        <SectionSubHeader>{t('common.common.as_link', 'As Link')}</SectionSubHeader>
        <SamplesStack>
          <Sample>
            <Link href="/" asChild>
              <Alert status="info" title={t('common.common.info', 'Info')}> {t('common.common.alert_content', 'Alert content')} </Alert>
            </Link>
          </Sample>
        </SamplesStack>
        <SectionSubHeader>{t('common.common.inside_table_socketnewitemsnotice', 'Inside table (SocketNewItemsNotice)')}</SectionSubHeader>
        <SamplesStack>
          <Sample label={t('common.common.loading', 'loading')}>
            <TableRoot tableLayout="auto">
              <TableHeader>
                <TableRow>
                  <TableColumnHeader w="100px">{t('common.common.block', 'Block')}</TableColumnHeader>
                  <TableColumnHeader w="100px">{t('common.common.age', 'Age')}</TableColumnHeader>
                  <TableColumnHeader w="100px">{t('common.common.gas_used', 'Gas used')}</TableColumnHeader>
                </TableRow>
              </TableHeader>
              <TableBody>
                <SocketNewItemsNotice.Desktop
                  num={ 1234 }
                  type="block"
                  isLoading
                />
              </TableBody>
            </TableRoot>
          </Sample>
          <Sample label={t('common.common.success', 'success')}>
            <TableRoot tableLayout="auto">
              <TableHeader>
                <TableRow>
                  <TableColumnHeader w="100px">{t('common.common.block', 'Block')}</TableColumnHeader>
                  <TableColumnHeader w="100px">{t('common.common.age', 'Age')}</TableColumnHeader>
                  <TableColumnHeader w="100px">{t('common.common.gas_used', 'Gas used')}</TableColumnHeader>
                </TableRow>
              </TableHeader>
              <TableBody>
                <SocketNewItemsNotice.Desktop
                  num={ 1234 }
                  type="block"
                  isLoading={ false }
                />
              </TableBody>
            </TableRoot>
          </Sample>
        </SamplesStack>

        <SectionSubHeader>{t('common.common.multiple_lines', 'Multiple lines')}</SectionSubHeader>
        <SamplesStack>
          <Sample label={t('common.common.multiple_lines_with_title_inline_false', 'multiple lines, with title, inline=false')}>
            <Alert status="warning" title={t('common.common.warning', 'Warning')} inline={ false } maxWidth="500px" showIcon closable>
              <Box>
                {t('common.common.participated_in_activities_text', 'Participated in our recent Blockscout activities? Check your eligibility and claim your NFT Scout badges. More exciting things are coming soon!')}
              </Box>
            </Alert>
          </Sample>
          <Sample label={t('common.common.multiple_lines_no_title')}>
            <Alert status="warning" maxWidth="500px">
              <Box>
                {t('common.common.participated_in_activities_text', 'Participated in our recent Blockscout activities? Check your eligibility and claim your NFT Scout badges. More exciting things are coming soon!')}
              </Box>
            </Alert>
          </Sample>
          <Sample label={t('common.common.with_spinner', 'with spinner')}>
            <TxPendingAlert/>
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(AlertShowcase);
