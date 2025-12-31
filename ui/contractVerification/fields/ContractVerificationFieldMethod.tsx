import {
  List,
  Box,
  createListCollection,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { FormFields } from '../types';
import type { SmartContractVerificationMethod, SmartContractVerificationConfig } from 'types/client/contract';

import { Heading } from 'toolkit/chakra/heading';
import { Link } from 'toolkit/chakra/link';
import type { SelectOption } from 'toolkit/chakra/select';
import { FormFieldSelect } from 'toolkit/components/forms/fields/FormFieldSelect';
import { Hint } from 'toolkit/components/Hint/Hint';
import { nbsp } from 'toolkit/utils/htmlEntities';

import { METHOD_LABELS } from '../utils';

interface Props {
  methods: SmartContractVerificationConfig['verification_options'];
}

const ContractVerificationFieldMethod = ({ methods }: Props) => {
  const { t } = useTranslation();

  const collection = React.useMemo(() => createListCollection<SelectOption>({
    items: methods.map((method) => ({
      value: method,
      label: METHOD_LABELS[method],
    })),
  }), [ methods ]);

  const renderPopoverListItem = React.useCallback((method: SmartContractVerificationMethod) => {
    switch (method) {
      case 'flattened-code':
        return <List.Item key={ method }>{ t('contract_verification.common.flattened_code_description') }</List.Item>;
      case 'multi-part':
        return <List.Item key={ method }>{ t('contract_verification.common.multi_part_description') }</List.Item>;
      case 'sourcify':
        return (
          <List.Item key={ method }>
            { t('contract_verification.common.sourcify_description') }
            <Link href="https://sourcify.dev/" external noIcon className="dark">{ t('common.common.sourcify') }</Link>.
          </List.Item>
        );
      case 'standard-input':
        return (
          <List.Item key={ method }>
            <span>{ t('contract_verification.common.standard_input_description') } </span>
            <Link
              href="https://docs.soliditylang.org/en/latest/using-the-compiler.html#input-description"
              external noIcon
              className="dark"
            >
              { t('contract_verification.common.standard_input_json') }
            </Link>
            <span> { t('common.common.file') }.</span>
          </List.Item>
        );
      case 'vyper-code':
        return <List.Item key={ method }>{ t('contract_verification.common.vyper_code_description') }</List.Item>;
      case 'vyper-multi-part':
        return <List.Item key={ method }>{ t('contract_verification.common.vyper_multi_part_description') }</List.Item>;
      case 'vyper-standard-input':
        return (
          <List.Item key={ method }>
            <span>{ t('contract_verification.common.vyper_standard_input_description') } </span>
            <Link
              href="https://docs.vyperlang.org/en/stable/compiling-a-contract.html#compiler-input-and-output-json-description"
              external noIcon
              className="dark"
            >
              { t('contract_verification.common.standard_input_json') }
            </Link>
            <span> { t('common.common.file') }.</span>
          </List.Item>
        );
      case 'solidity-hardhat':
        return <List.Item key={ method }>{ t('contract_verification.common.solidity_hardhat_description') }</List.Item>;
      case 'solidity-foundry':
        return <List.Item key={ method }>{ t('contract_verification.common.solidity_foundry_description') }</List.Item>;
      case 'stylus-github-repository':
        return <List.Item key={ method }>{ t('contract_verification.common.stylus_github_repository_description') }</List.Item>;
    }
  }, [ t ]);

  const tooltipContent = (
    <Box>
      <span>{ t('contract_verification.common.currently_supports_methods', { count: methods.length }) }:</span>
      <List.Root as="ol" pl={ 5 }>
        { methods.map(renderPopoverListItem) }
      </List.Root>
    </Box>
  );

  return (
    <>
      <Heading level="2" mt={{ base: 10, lg: 6 }} gridColumn={{ lg: '1 / 3' }}>
        { t('contract_verification.common.currently_supports_methods', { count: methods.length }) }{ nbsp }{ t('contract_verification.common.methods') }
        <Hint
          label={ tooltipContent }
          tooltipProps={{ interactive: true, contentProps: { textAlign: 'left' } }}
          ml={ 1 }
        />
      </Heading>
      <FormFieldSelect<FormFields, 'method'>
        name="method"
        placeholder={ t('contract_verification.common.verification_method_placeholder') }
        collection={ collection }
        required
        readOnly={ collection.items.length === 1 }
      />
    </>
  );
};

export default React.memo(ContractVerificationFieldMethod);
