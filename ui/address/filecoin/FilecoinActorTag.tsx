import React from 'react';
import { useTranslation } from 'react-i18next';

import type { FilecoinActorType } from 'types/api/addressParams';

import { Badge } from 'toolkit/chakra/badge';

type Props = {
  actorType: FilecoinActorType;
};

const FilecoinActorTag = ({ actorType }: Props) => {
  const { t } = useTranslation();
  const ACTOR_TYPES: Record<FilecoinActorType, string> = {
    account: t('common.common.account'),
    cron: 'Scheduled Tasks',
    datacap: t('addresses.common.data_cap_management'),
    eam: t('addresses.common.ethereum_address_manager'),
    ethaccount: 'Ethereum-Compatible Account',
    evm: t('addresses.common.ethereum_virtual_machine'),
    init: t('addresses.common.initialization'),
    market: t('addresses.common.storage_market'),
    miner: t('addresses.common.storage_provider'),
    multisig: t('addresses.common.multisignature_wallet'),
    paych: t('addresses.common.payment_channel'),
    placeholder: t('addresses.common.placeholder_address'),
    power: t('addresses.common.power_management'),
    reward: t('addresses.common.incentives_and_rewards'),
    system: t('addresses.common.system_operations'),
    verifreg: t('addresses.common.verification_registry'),
  };

  const text = ACTOR_TYPES[actorType];

  if (!text) {
    return null;
  }

  return <Badge colorPalette="gray">{ text }</Badge>;
};

export default FilecoinActorTag;
