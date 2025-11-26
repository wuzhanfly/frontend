import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import config from 'configs/app';
import { FormFieldCheckbox } from 'toolkit/components/forms/fields/FormFieldCheckbox';

import type { Inputs as FormFields } from './AddressForm';

const tokenStandardName = config.chain.tokenStandard;

const NOTIFICATIONS = [ 'native', 'ERC-20', 'ERC-721', 'ERC-404' ] as const;

export default function AddressFormNotifications() {
  const { t } = useTranslation();
  
  const NOTIFICATIONS_NAMES = [
    config.chain.currency.symbol,
    t('watchlist.address_form_notifications.erc_20', { tokenStandardName }),
    t('watchlist.address_form_notifications.erc_721_1155_nft', { tokenStandardName }),
    t('watchlist.address_form_notifications.erc_404', { tokenStandardName })
  ];

  return (
    <Grid templateColumns={{ base: 'repeat(2, max-content)', lg: 'repeat(3, max-content)' }} gap={{ base: '10px 24px', lg: '20px 24px' }}>
      { NOTIFICATIONS.map((notification, index: number) => {
        const incomingFieldName = `notification_settings.${ notification }.incoming` as const;
        const outgoingFieldName = `notification_settings.${ notification }.outcoming` as const;
        return (
          <React.Fragment key={ notification }>
            <GridItem
              gridColumnStart={{ base: 1, lg: 1 }}
              gridColumnEnd={{ base: 3, lg: 1 }}
              _notFirst={{
                mt: { base: 3, lg: 0 },
              }}
            >
              { NOTIFICATIONS_NAMES[index] }
            </GridItem>
            <GridItem>
              <FormFieldCheckbox<FormFields, typeof incomingFieldName>
                name={ incomingFieldName }
                label={t('account.common.incoming')}
              />
            </GridItem>
            <GridItem>
              <FormFieldCheckbox<FormFields, typeof outgoingFieldName>
                name={ outgoingFieldName }
                label={t('account.common.outgoing')}
              />
            </GridItem>
          </React.Fragment>
        );
      }) }
    </Grid>
  );
}
