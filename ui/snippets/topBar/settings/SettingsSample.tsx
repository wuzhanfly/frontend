import { Box, Text } from '@chakra-ui/react';
import React from 'react';

import { Tooltip } from 'toolkit/chakra/tooltip';

interface Props {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  isActive: boolean;
  bg: string;
  value: string;
  label: string;
  isLanguage?: boolean;
}

const SettingsSample = ({ label, value, bg, onClick, isActive, isLanguage = false }: Props) => {
  const bgColor = { base: 'white', _dark: 'gray.900' };
  const activeBgColor = { base: 'blue.50', _dark: 'whiteAlpha.100' };
  const activeBorderColor = { base: 'blackAlpha.800', _dark: 'gray.50' };

  if (isLanguage) {
    // For language options, display the flag as text
    const flagMap: Record<string, string> = {
      'en': '🇺🇸',
      'zh': '🇨🇳',
    };
    
    const flag = flagMap[value] || value;

    return (
      <Box p="9px" bgColor={ isActive ? activeBgColor : 'transparent' } borderRadius="base">
        <Tooltip content={ label }>
          <Box
            boxSize="22px"
            borderRadius="full"
            borderWidth="1px"
            borderColor={ isActive ? activeBgColor : bgColor }
            position="relative"
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="14px"
            fontWeight={ isActive ? 'bold' : 'normal' }
            _before={{
              position: 'absolute',
              display: 'block',
              boxSizing: 'content-box',
              content: '""',
              top: '-3px',
              left: '-3px',
              width: 'calc(100% + 2px)',
              height: 'calc(100% + 2px)',
              borderStyle: 'solid',
              borderRadius: 'full',
              borderWidth: '2px',
              borderColor: isActive ? activeBorderColor : 'transparent',
            }}
            _hover={{
              _before: {
                borderColor: isActive ? activeBorderColor : 'hover',
              },
            }}
            data-value={ value }
            onClick={ onClick }
          >
            {flag}
          </Box>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box p="9px" bgColor={ isActive ? activeBgColor : 'transparent' } borderRadius="base">
      <Tooltip content={ label }>
        <Box
          bg={ bg }
          boxSize="22px"
          borderRadius="full"
          borderWidth="1px"
          borderColor={ isActive ? activeBgColor : bgColor }
          position="relative"
          cursor="pointer"
          _before={{
            position: 'absolute',
            display: 'block',
            boxSizing: 'content-box',
            content: '""',
            top: '-3px',
            left: '-3px',
            width: 'calc(100% + 2px)',
            height: 'calc(100% + 2px)',
            borderStyle: 'solid',
            borderRadius: 'full',
            borderWidth: '2px',
            borderColor: isActive ? activeBorderColor : 'transparent',
          }}
          _hover={{
            _before: {
              borderColor: isActive ? activeBorderColor : 'hover',
            },
          }}
          data-value={ value }
          onClick={ onClick }
        />
      </Tooltip>
    </Box>
  );
};

export default React.memo(SettingsSample);