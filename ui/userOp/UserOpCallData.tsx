import React from 'react';
import { useTranslation } from 'react-i18next';

import type { UserOp } from 'types/api/userOps';

import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import RawInputData from 'ui/shared/RawInputData';

import UserOpCallDataSwitch from './UserOpCallDataSwitch';

interface Props {
  data: UserOp;
}

const UserOpDecodedCallData = ({ data }: Props) => {
  const { t } = useTranslation();

  const [ callData, setCallData ] = React.useState<string | null>(data.execute_call_data || data.call_data);

  const handleSwitchChange = React.useCallback((isChecked: boolean) => {
    setCallData(isChecked ? data.call_data : data.execute_call_data);
  }, [ data ]);

  if (!callData) {
    return null;
  }

  const toggler = data.call_data && data.execute_call_data ? (
    <UserOpCallDataSwitch
      id="call-data-switch"
      onChange={ handleSwitchChange }
      initialValue={ false }
      ml={{ base: 3, lg: 'auto' }}
    />
  ) : null;

  const labelText = data.call_data && !data.execute_call_data ? t('common.common.external_call_data') : t('common.common.call_data');

  return (
    <>
      <DetailedInfo.ItemLabel
        hint={t('user_ops.common.data_that_s_passed_to_the_sender_for_execution')}
        mb={{ base: 1, lg: 0 }}
      >
        { labelText }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <RawInputData hex={ callData } rightSlot={ toggler }/>
      </DetailedInfo.ItemValue>
    </>
  );
};

export default React.memo(UserOpDecodedCallData);
