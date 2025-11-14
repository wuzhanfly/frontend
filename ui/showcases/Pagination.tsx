import React from 'react';
import { useTranslation } from 'react-i18next';

import Pagination from 'ui/shared/pagination/Pagination';

import { Section, Container, SectionHeader, SamplesStack, Sample, SectionSubHeader } from './parts';

const PaginationShowcase = () => {
  const { t } = useTranslation();
  const [ page, setPage ] = React.useState(1);

  const handleNextPageClick = () => {
  const { t } = useTranslation();
    setPage(page + 1);
  };

  const handlePrevPageClick = () => {
  const { t } = useTranslation();
    setPage(page - 1);
  };

  const props = {
    page,
    onNextPageClick: handleNextPageClick,
    onPrevPageClick: handlePrevPageClick,
    resetPage: () => setPage(1),
    hasNextPage: page < 10,
    hasPages: true,
    isVisible: true,
    canGoBackwards: true,
    isLoading: false,
  };

  return (
    <Container value="pagination">
      <Section>
        <SectionHeader>Examples</SectionHeader>

        <SectionSubHeader>List pagination</SectionSubHeader>
        <SamplesStack>
          <Sample label={t('common.common.loaded_state')}>
            <Pagination { ...props }/>
          </Sample>
          <Sample label={t('common.common.initial_loading_state')}>
            <Pagination { ...props } hasPages={ false } page={ 1 } isLoading/>
          </Sample>
          <Sample label="Next page loading state">
            <Pagination { ...props } isLoading/>
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(PaginationShowcase);
