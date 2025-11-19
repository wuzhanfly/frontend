import { Box, chakra } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import React from 'react';

import { Link } from 'toolkit/chakra/link';

interface Props {
  className?: string;
}

const AdminSupportText = ({ className }: Props) => {
  const { t } = useTranslation();
  return (
    <Box className={ className }>
      <span>{t('common.common.need_help_contact_admin_team_at')}</span>
      <Link href="mailto:help@blockscout.com">help@blockscout.com</Link>
      <span>{t('common.common.for_assistance')}</span>
    </Box>
  );
};

export default chakra(AdminSupportText);
