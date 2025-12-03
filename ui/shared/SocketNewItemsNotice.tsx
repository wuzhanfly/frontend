import { Text, chakra } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import config from 'configs/app';
import { Alert } from 'toolkit/chakra/alert';
import { Link } from 'toolkit/chakra/link';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { TableCell, TableRow } from 'toolkit/chakra/table';

const flashblocksFeature = config.features.flashblocks;

interface InjectedProps {
  content: React.ReactNode;
}

interface Props {
  type?: 'transaction' | 'token_transfer' | 'deposit' | 'block' | 'flashblock' | 'cross_chain_transaction';
  children?: (props: InjectedProps) => React.JSX.Element;
  className?: string;
  url?: string;
  showErrorAlert?: boolean;
  num?: number;
  isLoading?: boolean;
  onLinkClick?: () => void;
}

const SocketNewItemsNotice = chakra(({ children, className, url, num, showErrorAlert, type = 'transaction', isLoading, onLinkClick }: Props) => {
  const { t } = useTranslation();
  const handleLinkClick = React.useCallback(() => {
    onLinkClick ? onLinkClick() : window.location.reload();
  }, [ onLinkClick ]);

  const alertContent = (() => {
    if (showErrorAlert) {
      return t('transactions.common.live_updates_delayed');
    }

    let name;

    switch (type) {
      case 'token_transfer':
        name = t('transactions.common.alert_token_transfer');
        break;
      case 'deposit':
        name = t('transactions.common.alert_deposit');
        break;
      case 'block':
        name = t('transactions.common.alert_block');
        break;
      case 'flashblock': {
        if (flashblocksFeature.isEnabled) {
          name = flashblocksFeature.name;
        }
        break;
      }
      case 'cross_chain_transaction':
        name = t('transactions.common.alert_cross_chain_transaction');
        break;
      default:
        name = t('transactions.common.alert_transaction');
        break;
    }

    if (!num) {
      return t('transactions.common.scanning_new_items', { name });
    }

    if (type === 'cross_chain_transaction') {
      return (
        <Link href={ url } onClick={ !url ? handleLinkClick : undefined }>{ t('transactions.common.more_items_available', { name }) }</Link>
      );
    }

    return (
      <>
        <Link href={ url } onClick={ !url ? handleLinkClick : undefined }>
          { t('transactions.common.num_more_names', { num: num.toLocaleString(), name, unit: num > 1 ? 's' : '' }) }
        </Link>
        <Text whiteSpace="pre">
          { t('transactions.common.have_come_in', { unit: num > 1 ? 've' : 's' }) }
        </Text>
      </>
    );
  })();

  const content = !isLoading ? (
    <Alert
      className={ className }
      status={ showErrorAlert || !num ? 'warning_table' : 'info' }
      px={ 4 }
      py="6px"
      textStyle="sm"
    >
      { alertContent }
    </Alert>
  ) : <Skeleton className={ className } h="36px" loading/>;

  return children ? children({ content }) : content;
});

export default SocketNewItemsNotice;

export const Desktop = ({ ...props }: Props) => {
  return (
    <SocketNewItemsNotice
      borderRadius={ props.isLoading ? 'sm' : 0 }
      h={ props.isLoading ? 5 : 'auto' }
      maxW={ props.isLoading ? '215px' : undefined }
      w="100%"
      mx={ props.isLoading ? 4 : 0 }
      my={ props.isLoading ? '6px' : 0 }
      { ...props }
    >
      { ({ content }) => <TableRow><TableCell colSpan={ 100 } p={ 0 } _first={{ p: 0 }} _last={{ p: 0 }}>{ content }</TableCell></TableRow> }
    </SocketNewItemsNotice>
  );
};

export const Mobile = ({ ...props }: Props) => {
  return (
    <SocketNewItemsNotice
      borderBottomRadius={ 0 }
      { ...props }
    />
  );
};
