import { Box, Flex, Text, Grid, chakra } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { SolidityScanReportSeverityDistribution } from 'lib/solidityScan/schema';

type DistributionItem = {
  id: keyof SolidityScanReportSeverityDistribution;
  name: string;
  color: string;
};

const getDistributionItems = (t: (key: string) => string): Array<DistributionItem> => [
  { id: 'critical', name: 'Critical', color: '#891F11' },
  { id: 'high', name: t('shared.common.high'), color: '#EC672C' },
  { id: 'medium', name: t('shared.common.medium'), color: '#FBE74D' },
  { id: 'low', name: t('shared.common.low'), color: '#68C88E' },
  { id: 'informational', name: t('shared.common.informational'), color: '#A3AEBE' },
  { id: 'gas', name: t('shared.common.gas'), color: '#A47585' },
];

interface Props {
  vulnerabilities: SolidityScanReportSeverityDistribution;
  vulnerabilitiesCount: number;
}

type ItemProps = {
  item: DistributionItem;
  vulnerabilities: SolidityScanReportSeverityDistribution;
  vulnerabilitiesCount: number;
};

const SolidityScanReportItem = ({ item, vulnerabilities, vulnerabilitiesCount }: ItemProps) => {
  const { t } = useTranslation();
  const vulnerability = vulnerabilities[item.id];

  if (vulnerability === undefined) {
    return null;
  }

  return (
    <>
      <Box w={ 3 } h={ 3 } bg={ item.color } borderRadius="6px" mr={ 2 }></Box>
      <Flex justifyContent="space-between" mr={ 3 }>
        <Text>{ item.name }</Text>
        <Text color={ vulnerability > 0 ? 'text.primary' : 'text.secondary' }>{ vulnerabilities[item.id] }</Text>
      </Flex>
      <Box bg={{ _light: 'blackAlpha.50', _dark: 'whiteAlpha.50' }} h="10px" borderRadius="8px">
        <Box bg={ item.color } w={ `${ vulnerability / vulnerabilitiesCount * 100 }%` } h="10px" borderRadius="8px"/>
      </Box>
    </>
  );
};

const SolidityscanReportDetails = ({ vulnerabilities, vulnerabilitiesCount }: Props) => {
  const { t } = useTranslation();
  const distributionItems = getDistributionItems(t);
  return (
    <Grid templateColumns="20px 1fr 100px" alignItems="center" rowGap={ 2 }>
      { distributionItems.map(item => (
        <SolidityScanReportItem item={ item } key={ item.id } vulnerabilities={ vulnerabilities } vulnerabilitiesCount={ vulnerabilitiesCount }/>
      )) }
    </Grid>
  );
};

export default chakra(SolidityscanReportDetails);
