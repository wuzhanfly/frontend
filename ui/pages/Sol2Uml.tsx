import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import PageTitle from 'ui/shared/Page/PageTitle';
import Sol2UmlDiagram from 'ui/sol2uml/Sol2UmlDiagram';

const Sol2Uml = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const addressHash = router.query.address?.toString() || '';

  return (
    <>
      <PageTitle title={t('visualize.common.solidity_uml_diagram')}/>
      <Flex mb={ 10 } flexWrap="wrap" columnGap={ 3 }>
        <span>For contract</span>
        <AddressEntity
          address={{ hash: addressHash, is_contract: true }}
        />
      </Flex>
      <Sol2UmlDiagram addressHash={ addressHash }/>
    </>
  );
};

export default Sol2Uml;
