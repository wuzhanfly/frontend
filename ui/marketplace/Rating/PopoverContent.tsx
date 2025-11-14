import { Text, Flex, Spinner } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';

import config from 'configs/app';
import useApiFetch from 'lib/api/useApiFetch';
import type { EventTypes, EventPayload } from 'lib/mixpanel/index';
import * as mixpanel from 'lib/mixpanel/index';
import { Rating } from 'toolkit/chakra/rating';
import { toaster } from 'toolkit/chakra/toaster';
import IconSvg from 'ui/shared/IconSvg';

type Props = {
  appId: string;
  userRating?: number;
  source: EventPayload<EventTypes.APP_FEEDBACK>['Source'];
};

const PopoverContent = ({ appId, userRating, source }: Props) => {
  const { t } = useTranslation();
  const ratingDescriptions = [ t('marketplace.common.very_bad'), t('marketplace.common.bad'), t('marketplace.common.average'), t('marketplace.common.good'), t('marketplace.common.excellent') ];
  
  const apiFetch = useApiFetch();
  const [ isSending, setIsSending ] = React.useState(false);
  const [ ratingValue, setRatingValue ] = React.useState(userRating);
  const queryClient = useQueryClient();

  const handleValueChange = React.useCallback(async({ value }: { value: number }) => {
    setIsSending(true);

    try {
      await apiFetch('admin:marketplace_rate_dapp', {
        pathParams: { chainId: config.chain.id, dappId: appId },
        fetchParams: {
          method: 'POST',
          body: { rating: value },
        },
      });

      setRatingValue(value);
      queryClient.invalidateQueries({ queryKey: [ 'marketplace-dapps' ] });

      toaster.success({
        title: t('marketplace.common.awesome_thank_you_'),
        description: t('marketplace.common.your_rating_improves_the_servi'),
      });

      mixpanel.logEvent(
        mixpanel.EventTypes.APP_FEEDBACK,
        { Action: 'Rating', Source: source, AppId: appId, Score: value },
      );
    } catch (error) {
      toaster.error({
        title: t('marketplace.common.ooops_something_went_wrong'),
        description: t('marketplace.common.please_try_again_later'),
      });
    }

    setIsSending(false);
  }, [ appId, source, apiFetch, queryClient ]);

  if (isSending) {
    return (
      <Flex alignItems="center">
        <Spinner size="md"/>
        <Text fontSize="md" ml={ 3 }>Sending your feedback</Text>
      </Flex>
    );
  }

  return (
    <>
      <Flex alignItems="center" h="30px">
        { ratingValue && (
          <IconSvg name="verified" color="green.400" boxSize="30px" mr={ 1 } ml="-5px"/>
        ) }
        <Text fontWeight="500" textStyle="xs" color="text.secondary">
          { ratingValue ? t('marketplace.common.app_is_already_rated_by_you') : 'How was your experience?' }
        </Text>
      </Flex>
      <Rating
        defaultValue={ ratingValue }
        onValueChange={ handleValueChange }
        label={ ratingDescriptions }
        h="32px"
      />
    </>
  );
};

export default PopoverContent;
