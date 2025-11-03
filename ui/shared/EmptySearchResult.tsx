import { Flex, Icon, Box } from '@chakra-ui/react';
import * as React from 'react';

import emptySearchResultIcon from 'icons-components/EmptySearchResult';
import { Heading } from 'toolkit/chakra/heading';

interface Props {
  text: string | React.JSX.Element;
}

const EmptySearchResult = ({ text }: Props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt="50px"
    >
      <Icon
        as={ emptySearchResultIcon }
        w={{ base: '160px', sm: '240px' }}
        h="auto"
        mb={{ base: 4, sm: 6 }}
      />

      <Heading level="3" mb={ 2 }>
        No results
      </Heading>

      <Box fontSize={{ base: 'sm', sm: 'md' }} textAlign="center">
        { text }
      </Box>
    </Box>
  );
};

export default EmptySearchResult;
