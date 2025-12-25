import { chakra } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'toolkit/chakra/button';
import { Checkbox, CheckboxGroup } from 'toolkit/chakra/checkbox';
import { PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from 'toolkit/chakra/popover';
import type { ColumnsIds } from 'ui/advancedFilter/constants';
import { TABLE_COLUMNS } from 'ui/advancedFilter/constants';
import IconSvg from 'ui/shared/IconSvg';

interface Props {
  columns: Record<ColumnsIds, boolean>;
  onChange: (val: Record<ColumnsIds, boolean>) => void;
}

const ColumnsButton = ({ columns, onChange }: Props) => {
  const { t } = useTranslation();
  const handleValueChange = React.useCallback((value: Array<string>) => {
    const newCols = value.reduce((acc, key) => {
      acc[key as ColumnsIds] = true;
      return acc;
    }, {} as Record<ColumnsIds, boolean>);
    onChange(newCols);
  }, [ onChange ]);

  return (
    <PopoverRoot>
      <PopoverTrigger>
        <Button
          variant="dropdown"
          size="sm"
          px={{ base: 1, lg: 3 }}
        >
          <IconSvg name="columns" boxSize={ 5 } color="inherit"/>
          <chakra.span hideBelow="lg">{ t('advanced_filter.common.columns') }</chakra.span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody px={ 4 } py={ 6 } display="flex" flexDir="column" rowGap={ 5 }>
          <CheckboxGroup
            defaultValue={ Object.keys(columns).filter((key) => columns[key as ColumnsIds]) }
            onValueChange={ handleValueChange }
            display="grid"
            gridTemplateColumns="160px 160px"
            gap={ 3 }
          >
            { TABLE_COLUMNS.map(col => (
              <Checkbox
                key={ col.id }
                value={ col.id }
                size="md"
              >
                { col.id === 'or_and' ? t('advanced_filter.common.and_or') : col.name }
              </Checkbox>
            )) }
          </CheckboxGroup>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default ColumnsButton;
