import { Box } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { type AdvancedFilterParams } from 'types/api/advancedFilter';

import { Radio, RadioGroup } from 'toolkit/chakra/radio';

const FILTER_PARAM = 'address_relation';

type Value = 'or' | 'and';

const DEFAULT_VALUE = 'or' as Value;

type Props = {
  value?: Value;
  handleFilterChange: (filed: keyof AdvancedFilterParams, value?: string) => void;
  columnName: string;
  isLoading?: boolean;
  onClose?: () => void;
};

const AddressRelationFilter = ({ value = DEFAULT_VALUE, handleFilterChange, onClose }: Props) => {
  const { t } = useTranslation();

  const onFilter = React.useCallback(({ value }: { value: string | null }) => {
    if (!value) {
      return;
    }

    onClose && onClose();
    handleFilterChange(FILTER_PARAM, value as Value);
  }, [ handleFilterChange, onClose ]);

  return (
    <Box w="120px">
      <RadioGroup onValueChange={ onFilter } value={ value } orientation="vertical">
        <Radio value="or">{ t('advanced_filter.common.or') }</Radio>
        <Radio value="and">{ t('advanced_filter.common.and') }</Radio>
      </RadioGroup>
    </Box>
  );
};

export default AddressRelationFilter;
