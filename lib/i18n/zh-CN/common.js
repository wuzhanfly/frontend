// 总引入文件，导入所有模块的国际化资源
import accountZh from './account/common.json';
import addressesZh from './addresses/common.json';
import advanced_filterZh from './advanced_filter/common.json';
import apiZh from './api/common.json';
import blobsZh from './blobs/common.json';
import blocksZh from './blocks/common.json';
import bridgeZh from './bridge/common.json';
import chartsZh from './charts/common.json';
import clustersZh from './clusters/common.json';
import commonZh from './common/common.json';
import contract_verificationZh from './contract_verification/common.json';
import dashboardZh from './dashboard/common.json';
import epochsZh from './epochs/common.json';
import filter_reportZh from './filter-report/common.json';
import gamesZh from './games/common.json';
import gas_trackerZh from './gas_tracker/common.json';
import marketplaceZh from './marketplace/common.json';
import messagingZh from './messaging/common.json';
import name_serviceZh from './name_service/common.json';
import optimism_superchainZh from './optimism_superchain/common.json';
import poolsZh from './pools/common.json';
import public_tagsZh from './public_tags/common.json';
import settingsZh from './settings/common.json';
import sharedZh from './shared';
import stakingZh from './staking/common.json';
import statsZh from './stats/common.json';
import tokensZh from './tokens/common.json';
import tokenTransfersZh from './tokenTransfers/common.json';
import transactionsZh from './transactions/common.json';
import txsZh from './txs/common.json';
import user_opsZh from './user_ops/common.json';
import validatorsZh from './validators/common.json';
import verified_addressesZh from './verified_addresses/common.json';
import visualizeZh from './visualize/common.json';
import watchlistZh from './watchlist/common.json';

// 合并所有模块的键值
const combinedZh = {
  ...accountZh,
  ...addressesZh,
  ...advanced_filterZh,
  ...apiZh,
  ...blobsZh,
  ...blocksZh,
  ...bridgeZh,
  ...chartsZh,
  ...clustersZh,
  ...commonZh,
  ...contract_verificationZh,
  ...dashboardZh,
  ...epochsZh,
  ...filter_reportZh,
  ...gamesZh,
  ...gas_trackerZh,
  ...marketplaceZh,
  ...messagingZh,
  ...name_serviceZh,
  ...optimism_superchainZh,
  ...poolsZh,
  ...public_tagsZh,
  ...settingsZh,
  ...sharedZh,
  ...stakingZh,
  ...statsZh,
  ...tokensZh,
  ...tokenTransfersZh,
  ...transactionsZh,
  ...txsZh,
  ...user_opsZh,
  ...validatorsZh,
  ...verified_addressesZh,
  ...visualizeZh,
  ...watchlistZh,
};

export default combinedZh;