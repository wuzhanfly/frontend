import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { pickBy } from 'es-toolkit';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { FormSubmitResult } from './types';

import { route } from 'nextjs-routes';

import { Alert } from 'toolkit/chakra/alert';
import { Button } from 'toolkit/chakra/button';
import { Heading } from 'toolkit/chakra/heading';
import { Link } from 'toolkit/chakra/link';
import { makePrettyLink } from 'toolkit/utils/url';

import PublicTagsSubmitResultSuccess from './result/PublicTagsSubmitResultSuccess';
import PublicTagsSubmitResultWithErrors from './result/PublicTagsSubmitResultWithErrors';
import { groupSubmitResult } from './utils';

interface Props {
  data: FormSubmitResult | undefined;
}

const PublicTagsSubmitResult = ({ data }: Props) => {
  const { t } = useTranslation();
  const groupedData = React.useMemo(() => groupSubmitResult(data), [ data ]);

  if (!groupedData) {
    return null;
  }

  const hasErrors = groupedData.items.some((item) => item.error !== null);
  const companyWebsite = makePrettyLink(groupedData.companyWebsite);
  const startOverButtonQuery = hasErrors ? pickBy({
    requesterName: groupedData.requesterName,
    requesterEmail: groupedData.requesterEmail,
    companyName: groupedData.companyName,
    companyWebsite: groupedData.companyWebsite,
  }, Boolean) : undefined;

  return (
    <div>
      { !hasErrors && (
        <Alert status="success" mb={ 6 }>
          {t('public_tags.result.success_message')}
        </Alert>
      ) }

      <Heading level="2">{t('public_tags.result.company_info')}</Heading>
      <Grid rowGap={ 3 } columnGap={ 6 } gridTemplateColumns="170px 1fr" mt={ 6 }>
        <GridItem>{t('public_tags.result.your_name')}</GridItem>
        <GridItem>{ groupedData.requesterName }</GridItem>
        <GridItem>{t('public_tags.result.email')}</GridItem>
        <GridItem>{ groupedData.requesterEmail }</GridItem>
        { groupedData.companyName && (
          <>
            <GridItem>{t('public_tags.result.company_name')}</GridItem>
            <GridItem>{ groupedData.companyName }</GridItem>
          </>
        ) }
        { companyWebsite && (
          <>
            <GridItem>{t('public_tags.result.company_website')}</GridItem>
            <GridItem>
              <Link external href={ companyWebsite.href }>{ companyWebsite.domain }</Link>
            </GridItem>
          </>
        ) }
      </Grid>

      <Heading level="2" mt={ 8 } mb={ 5 }>{t('public_tags.result.public_tags_labels')}</Heading>
      { hasErrors ? <PublicTagsSubmitResultWithErrors data={ groupedData }/> : <PublicTagsSubmitResultSuccess data={ groupedData }/> }

      <Flex flexDir={{ base: 'column', lg: 'row' }} columnGap={ 6 } mt={ 8 } rowGap={ 3 }>
        { hasErrors && (
          <Link href={ route({ pathname: '/public-tags/submit', query: startOverButtonQuery }) } asChild>
            <Button variant="outline" w={{ base: '100%', lg: 'auto' }}>
              {t('public_tags.result.start_over')}
            </Button>
          </Link>
        ) }
        <Link href={ route({ pathname: '/public-tags/submit' }) } asChild>
          <Button w={{ base: '100%', lg: 'auto' }}>{t('public_tags.result.add_new_tag')}</Button>
        </Link>
      </Flex>
    </div>
  );
};

export default React.memo(PublicTagsSubmitResult);
