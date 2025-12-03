import { chakra, Box } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { route } from 'nextjs-routes';

import { Link } from 'toolkit/chakra/link';

interface Props {
  blockHeight: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  isMultichain?: boolean;
}

const SearchBarSuggestBlockCountdown = ({ blockHeight, onClick, className, isMultichain }: Props) => {
  const { t } = useTranslation();

  if (isMultichain) {
    return (
      <Box className={ className }>
        { t('common.common.block_not_created_yet') }.
        <Link href={ route({ pathname: '/blocks' }) } onClick={ onClick }>{ t('common.common.view_existing_blocks') }</Link>.
      </Box>
    );
  }

  return (
    <Box className={ className }>
      <span>{ t('common.common.learn') } </span>
      <Link href={ route({ pathname: '/block/countdown/[height]', query: { height: blockHeight } }) } onClick={ onClick }>
        { t('common.common.estimated_time_for_this_block') }
      </Link>
      <span> { t('common.common.to_be_created') }.</span>
    </Box>
  );
};

export default React.memo(chakra(SearchBarSuggestBlockCountdown));
