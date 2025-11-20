import { Box, Flex } from '@chakra-ui/react';
import { range } from 'es-toolkit';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { SmartContractMethod } from './types';

import { route } from 'nextjs-routes';

import { AccordionRoot } from 'toolkit/chakra/accordion';
import { Link } from 'toolkit/chakra/link';
import { apos } from 'toolkit/utils/htmlEntities';

import ContractAbiItem from './ContractAbiItem';
import useFormSubmit from './useFormSubmit';
import useScrollToMethod from './useScrollToMethod';

interface Props {
  abi: Array<SmartContractMethod>;
  visibleItems?: Array<number>;
  addressHash: string;
  tab: string;
  sourceAddress?: string;
}

const ContractAbi = ({ abi, addressHash, sourceAddress, tab, visibleItems }: Props) => {
  const { t } = useTranslation();
  const [ expandedSections, setExpandedSections ] = React.useState<Array<string>>(abi.length === 1 ? [ '0' ] : []);
  const [ id, setId ] = React.useState(0);

  useScrollToMethod(abi, setExpandedSections);

  const handleFormSubmit = useFormSubmit({ addressHash });

  const handleAccordionStateChange = React.useCallback(({ value }: { value: Array<string> }) => {
    setExpandedSections(value);
  }, []);

  const handleExpandAll = React.useCallback(() => {
    if (!abi) {
      return;
    }

    if (expandedSections.length < abi.length) {
      setExpandedSections(range(0, abi.length).map(String));
    } else {
      setExpandedSections([]);
    }
  }, [ abi, expandedSections.length ]);

  const handleReset = React.useCallback(() => {
    setId((id) => id + 1);
  }, []);

  const hasVisibleItems = !visibleItems || visibleItems.length > 0;

  return (
    <div>
      <Flex mb={ 3 }>
        <Box fontWeight={ 500 } mr="auto">{ t('addresses.common.contract_information') }</Box>
        { abi.length > 1 && (
          <Link onClick={ handleExpandAll } variant="secondary">
            { expandedSections.length === abi.length ? t('addresses.common.collapse') : t('addresses.common.expand') } all
          </Link>
        ) }
        <Link onClick={ handleReset } ml={ 3 } variant="secondary">{ t('common.common.reset') }</Link>
      </Flex>
      <AccordionRoot multiple lazyMount position="relative" onValueChange={ handleAccordionStateChange } value={ expandedSections }>
        { abi.map((item, index) => (
          <ContractAbiItem
            key={ index }
            id={ id }
            index={ index }
            data={ item }
            isOpen={ expandedSections.includes(String(index)) }
            isVisible={ !visibleItems || visibleItems.includes(index) }
            addressHash={ addressHash }
            sourceAddress={ sourceAddress }
            tab={ tab }
            onSubmit={ handleFormSubmit }
          />
        )) }
      </AccordionRoot>
      { !hasVisibleItems && (
        <div>
          <div>{ t('addresses.common.couldnt_find_any_method_that_matches_your_query') }</div>
          <div>
            { t('addresses.common.you_can_use_custom_abi_for_this_contract_without_verifying_the_contract_in_the') }
            { ' ' }
            <Link
              href={ route({ pathname: '/address/[hash]', query: { hash: addressHash, tab: 'read_write_custom_methods' } }) }
              scroll={ false }
            >
              { t('addresses.common.custom_abi') }
            </Link>
            { ' ' }{ t('addresses.common.tab') }.
          </div>
        </div>
      ) }
    </div>
  );
};

export default React.memo(ContractAbi);
