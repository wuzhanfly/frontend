import React from 'react';
import { useTranslation } from 'react-i18next';

import { route } from 'nextjs-routes';

import { Button } from 'toolkit/chakra/button';
import { Link } from 'toolkit/chakra/link';

import AppErrorIcon from '../AppErrorIcon';
import AppErrorTitle from '../AppErrorTitle';

interface Props {
  hash?: string;
}

const AppErrorBlockConsensus = ({ hash }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <AppErrorIcon statusCode={ 404 }/>
      <AppErrorTitle title={t('shared.common.block_removed_due_to_chain_reo')}/>
      <Link href={ hash ? route({ pathname: '/block/[height_or_hash]', query: { height_or_hash: hash } }) : route({ pathname: '/' }) } asChild>
        <Button
          mt={ 8 }
          variant="outline"
        >
          { hash ? t('shared.common.view_reorg') : t('shared.common.back_to_home') }
        </Button>
      </Link>
    </>
  );
};

export default AppErrorBlockConsensus;
