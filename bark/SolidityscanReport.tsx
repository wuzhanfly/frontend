import { Box, Text, Icon } from '@chakra-ui/react';
import NextLink from 'next/link';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import solidityScanIcon from '@icons/brands/solidity_scan.svg';
import useFetchReport from 'lib/solidityScan/useFetchReport';
import { Link } from 'toolkit/chakra/link';
import { PopoverBody, PopoverContent, PopoverRoot } from 'toolkit/chakra/popover';
import SolidityscanReportButton from 'ui/shared/solidityscanReport/SolidityscanReportButton';
import SolidityscanReportDetails from 'ui/shared/solidityscanReport/SolidityscanReportDetails';
import SolidityscanReportScore from 'ui/shared/solidityscanReport/SolidityscanReportScore';

interface Props {
  hash: string;
}

const SolidityscanReport = ({ hash }: Props) => {

  const { t } = useTranslation();
  const { data, isPlaceholderData, isError } = useFetchReport({ hash });

  if (isError || !data) {
    return null;
  }

  const score = Number(data.scan_report.scan_summary.score_v2);

  if (!score) {
    return null;
  }

  const vulnerabilities = data.scan_report.scan_summary.issue_severity_distribution;
  const vulnerabilitiesCounts = vulnerabilities ? Object.values(vulnerabilities) : [];
  const vulnerabilitiesCount = vulnerabilitiesCounts.reduce((acc, val) => acc + val, 0);

  return (
    <PopoverRoot>
      <SolidityscanReportButton
        score={ score }
        isLoading={ isPlaceholderData }
      />
      <PopoverContent w={{ base: '100vw', lg: '328px' }}>
        <PopoverBody textStyle="sm">
          <Box mb={ 5 } lineHeight="25px">
            { t('addresses.common.contract_analyzed_for_vulnerability_patterns_by') }
            <Icon as={ solidityScanIcon } mr={ 1 } ml="6px" w="23px" h="20px" display="inline-block" verticalAlign="middle"/>
            <Text fontWeight={ 600 } display="inline-block">SolidityScan</Text>
          </Box>
          <SolidityscanReportScore score={ score } mb={ 5 }/>
          { vulnerabilities && vulnerabilitiesCount > 0 && (
            <Box mb={ 5 }>
              <Text py="7px" color="text.secondary" textStyle="xs" fontWeight={ 500 }>{ t('addresses.common.vulnerabilities_distribution') }</Text>
              <SolidityscanReportDetails vulnerabilities={ vulnerabilities } vulnerabilitiesCount={ vulnerabilitiesCount }/>
            </Box>
          ) }
          <Link href={ data.scan_report.scanner_reference_url } external>{ t('addresses.common.view_full_report') }</Link>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default React.memo(SolidityscanReport);
