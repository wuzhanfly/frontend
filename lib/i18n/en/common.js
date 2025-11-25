// 总引入文件，导入所有模块的国际化资源
import accountEn from './account/common.json';
import addressesEn from './addresses/common.json';
import advanced_filterEn from './advanced_filter/common.json';
import apiEn from './api/common.json';
import blobsEn from './blobs/common.json';
import blocksEn from './blocks/common.json';
import bridgeEn from './bridge/common.json';
import chartsEn from './charts/common.json';
import clustersEn from './clusters/common.json';
import commonEn from './common/common.json';
import contract_verificationEn from './contract_verification/common.json';
import dashboardEn from './dashboard/common.json';
import epochsEn from './epochs/common.json';
import filter_reportEn from './filter-report/common.json';
import gamesEn from './games/common.json';
import gas_trackerEn from './gas_tracker/common.json';
import internalTxsEn from './internalTxs/common.json';
import marketplaceEn from './marketplace/common.json';
import messagingEn from './messaging/common.json';
import name_serviceEn from './name_service/common.json';
import optimism_superchainEn from './optimism_superchain/common.json';
import poolsEn from './pools/common.json';
import public_tagsEn from './public_tags/common.json';
import settingsEn from './settings/common.json';
import sharedEn from './shared';
import stakingEn from './staking/common.json';
import statsEn from './stats/common.json';
import tokensEn from './tokens/common.json';
import tokenTransfersEn from './tokenTransfers/common.json';
import transactionsEn from './transactions/common.json';
import txsEn from './txs/common.json';
import txnBatchesEn from './txnBatches/common.json';
import user_opsEn from './user_ops/common.json';
import validatorsEn from './validators/common.json';
import verified_addressesEn from './verified_addresses/common.json';
import verifiedContractsEn from './verifiedContracts/common.json';
import visualizeEn from './visualize/common.json';
import watchlistEn from './watchlist/common.json';

// 合并所有模块的键值
const combinedEn = {
  ...accountEn,
  ...addressesEn,
  ...advanced_filterEn,
  ...apiEn,
  ...blobsEn,
  ...blocksEn,
  ...bridgeEn,
  ...chartsEn,
  ...clustersEn,
  ...commonEn,
  ...contract_verificationEn,
  ...dashboardEn,
  ...epochsEn,
  ...filter_reportEn,
  ...gamesEn,
  ...gas_trackerEn,
  ...internalTxsEn,
  ...marketplaceEn,
  ...messagingEn,
  ...name_serviceEn,
  ...optimism_superchainEn,
  ...poolsEn,
  ...public_tagsEn,
  ...settingsEn,
  ...sharedEn,
  ...stakingEn,
  ...statsEn,
  ...tokensEn,
  ...tokenTransfersEn,
  ...transactionsEn,
  ...txnBatchesEn,
  ...user_opsEn,
  ...validatorsEn,
  ...verified_addressesEn,
  ...verifiedContractsEn,
  ...visualizeEn,
  ...watchlistEn,
};

export default combinedEn;