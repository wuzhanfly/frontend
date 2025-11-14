import { Box } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { TableColumnHeader, TableHeaderSticky, TableRoot, TableRow, TableCell, TableBody, TableColumnHeaderSortable } from 'toolkit/chakra/table';
import { getNextOrderValue } from 'ui/shared/sort/getNextSortValue';

import { Section, Container, SectionHeader, SamplesStack, Sample } from './parts';

const getItems = (t: (key: string) => string) => [
  { id: 1, name: t('common.common.laptop'), category: t('common.common.electronics'), price: 999.99 },
  { id: 2, name: t('common.common.coffee_maker'), category: t('common.common.home_appliances'), price: 49.99 },
  { id: 3, name: t('common.common.desk_chair'), category: t('common.common.furniture'), price: 150.0 },
  { id: 4, name: t('common.common.smartphone'), category: t('common.common.electronics'), price: 799.99 },
  { id: 5, name: t('common.common.headphones'), category: t('common.common.accessories'), price: 199.99 },
];

type Item = ReturnType<typeof getItems>[number];

type SortField = 'name' | 'category' | 'price';
type SortValue = 'name-asc' | 'name-desc' | 'category-asc' | 'category-desc' | 'price-asc' | 'price-desc' | 'default';

const SORT_SEQUENCE: Record<SortField, Array<SortValue>> = {
  name: [ 'name-desc', 'name-asc', 'default' ],
  category: [ 'category-desc', 'category-asc', 'default' ],
  price: [ 'price-desc', 'price-asc', 'default' ],
};

const TableShowcase = () => {
  const { t } = useTranslation();
  const ITEMS = getItems(t);
  const [ sortField, setSortField ] = React.useState<SortField>('price');
  const [ sortOrder, setSortOrder ] = React.useState<'asc' | 'desc' | undefined>('asc');

  const handleSortChange = React.useCallback((field: SortField) => {
    setSortField(field);
    setSortOrder(getNextOrderValue(sortOrder));
  }, [ sortOrder ]);

  const sortFn = React.useMemo(() => {
    return (a: Item, b: Item) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      }

      if (sortOrder === 'desc') {
        return aValue < bValue ? 1 : -1;
      }

      return 0;
    };
  }, [ sortField, sortOrder ]);

  return (
    <Container value="table">
      <Section>
        <SectionHeader>{t('common.common.showcase.table.variant')}</SectionHeader>
        <SamplesStack >
          <Sample label="variant: line">
            <TableRoot>
              <TableHeaderSticky>
                <TableRow>
                  <TableColumnHeaderSortable
                    sortField="name"
                    sortValue={ sortField === 'name' ? (sortOrder || 'asc') : 'asc' }
                    onSortToggle={ () => handleSortChange('name') }
                  >
                    {t('common.common.name')}
                  </TableColumnHeaderSortable>
                  <TableColumnHeaderSortable
                    sortField="category"
                    sortValue={ sortField === 'category' ? (sortOrder || 'asc') : 'asc' }
                    onSortToggle={ () => handleSortChange('category') }
                  >
                    {t('common.common.category')}
                  </TableColumnHeaderSortable>
                  <TableColumnHeaderSortable
                    sortField="price"
                    sortValue={ sortField === 'price' ? (sortOrder || 'asc') : 'asc' }
                    onSortToggle={ () => handleSortChange('price') }
                  >
                    {t('common.common.price')}
                  </TableColumnHeaderSortable>
                </TableRow>
              </TableHeaderSticky>
              <TableBody>
                { ITEMS.slice().sort(sortFn).map((item) => (
                  <TableRow key={ item.id }>
                    <TableCell>{ item.name }</TableCell>
                    <TableCell>{ item.category }</TableCell>
                    <TableCell isNumeric>{ item.price }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </TableRoot>
            <Box h="1000px"/>
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(TableShowcase);
