import React from 'react';
import { useTranslation } from 'react-i18next';

import type { TokenInfoApplication } from 'types/api/account';

import { Alert } from 'toolkit/chakra/alert';

interface Props {
  application?: TokenInfoApplication;
}

const TokenInfoFormStatusText = ({ application }: Props) => {

  if (!application) {
    return null;
  }

  switch (application.status) {
    case 'IN_PROCESS': {
      const { t } = useTranslation();
      return (
        <div>
          <div>{ t('tokens.info.request_process_info') }</div>
          <Alert status="warning" mt={ 6 }>{ t('tokens.info.request_in_progress') }</Alert>
        </div>
      );
    }

    case 'UPDATE_REQUIRED': {
      return (
        <div>
          { application.adminComments && <Alert status="warning" mt={ 6 }>{ application.adminComments }</Alert> }
        </div>
      );
    }

    case 'REJECTED': {
      return (
        <div>
          { application.adminComments && <Alert status="warning" mt={ 6 }>{ application.adminComments }</Alert> }
        </div>
      );
    }

    default:
      return null;
  }
};

export default React.memo(TokenInfoFormStatusText);
