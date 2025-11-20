import { Box } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import config from 'configs/app';
import { currencyUnits } from 'lib/units';
import { AccordionRoot } from 'toolkit/chakra/accordion';
import { Heading } from 'toolkit/chakra/heading';

import GasTrackerFaqItem from './GasTrackerFaqItem';

const GasTrackerFaq = () => {
  const { t } = useTranslation();
  
  const FAQ_ITEMS = [
    {
      question: t('gas_tracker.common.what_does_gas_refer_to_on_the_blockchain'),
      answer: t('common.common.gas_is_the_amount_of_native_to'),
    },
    {
      question: t('gas_tracker.common.how_can_i_check_chain_gas_fees', { chainName: config.chain.name }),
      // eslint-disable-next-line max-len
      answer: t('gas_tracker.common.you_can_easily_check_live_chain_gas_fees', { chainName: config.chain.name, currencyUnit: currencyUnits.gwei }),
    },
    {
      question: t('gas_tracker.common.what_is_the_average_gas_fee_for_chain_transactions', { chainName: config.chain.name }),
      // eslint-disable-next-line max-len
      answer: t('gas_tracker.common.the_average_gas_fee_for_chain_transactions', { chainName: config.chain.name }),
    },
    {
      question: t('gas_tracker.common.how_does_blockscout_calculate_gas_fees'),
      answer: t('gas_tracker.common.blockscout_calculates_gas_fees'),
    },
  ];

  return (
    <Box mt={ 12 }>
      <Heading level="2" mb={ 4 }>{t('gas_tracker.common.faq')}</Heading>
      <AccordionRoot variant="faq">
        { FAQ_ITEMS.map((item, index) => (
          <GasTrackerFaqItem key={ index } question={ item.question } answer={ item.answer }/>
        )) }
      </AccordionRoot>
    </Box>
  );
};

export default GasTrackerFaq;
