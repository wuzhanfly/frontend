import { useTranslation } from 'react-i18next';
import type { ZetaChainCCTXFilterParams } from 'types/client/zetaChain';

import ZetaChainAddressFilter from './ZetaChainAddressFilter';

const FILTER_PARAM_RECEIVER = 'receiver_address';
const FILTER_PARAM_RECEIVER_CHAIN = 'target_chain_id';

type Props = {
  value?: Array<string>;
  chainValue?: Array<string>;
  handleFilterChange: (field: keyof ZetaChainCCTXFilterParams, value?: Array<string> | Array<string>) => void;
  columnName: string;
  isLoading?: boolean;
  onClose?: () => void;
};

const ZetaChainReceiverFilter = (props: Props) => {
  const { t } = useTranslation();
  return (
    <ZetaChainAddressFilter
      { ...props }
      filterParam={ FILTER_PARAM_RECEIVER }
      chainFilterParam={ FILTER_PARAM_RECEIVER_CHAIN }
      title={t('common.common.receiver')}
      placeholder={t('common.common.receiver_address')}
    />
  );
};

export default ZetaChainReceiverFilter;
