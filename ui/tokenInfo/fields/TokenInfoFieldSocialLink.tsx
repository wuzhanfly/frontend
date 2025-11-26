import React from 'react';
import { useTranslation } from 'react-i18next';
import type { ControllerRenderProps } from 'react-hook-form';

import type { Fields, SocialLinkFields } from '../types';

import type { FieldProps } from 'toolkit/chakra/field';
import { FormFieldUrl } from 'toolkit/components/forms/fields/FormFieldUrl';
import type { IconName } from 'ui/shared/IconSvg';
import IconSvg from 'ui/shared/IconSvg';

interface Item {
  icon: IconName;
  label: string;
  color: string;
}
const getSettings = (t: (key: string) => string): Record<keyof SocialLinkFields, Item> => ({
  github: { label: t('tokens.common.github'), icon: 'social/github_filled', color: 'text.primary' },
  telegram: { label: t('tokens.common.telegram'), icon: 'social/telegram_filled', color: 'telegram' },
  linkedin: { label: t('tokens.common.linkedin'), icon: 'social/linkedin_filled', color: 'linkedin' },
  discord: { label: t('tokens.common.discord'), icon: 'social/discord_filled', color: 'discord' },
  slack: { label: t('tokens.common.slack'), icon: 'social/slack_filled', color: 'slack' },
  twitter: { label: t('tokens.common.twitter'), icon: 'social/twitter_filled', color: 'text.primary' },
  opensea: { label: t('tokens.common.opensea'), icon: 'social/opensea_filled', color: 'opensea' },
  facebook: { label: t('tokens.common.facebook'), icon: 'social/facebook_filled', color: 'facebook' },
  medium: { label: t('tokens.common.medium'), icon: 'social/medium_filled', color: 'text.primary' },
  reddit: { label: t('tokens.common.reddit'), icon: 'social/reddit_filled', color: 'reddit' },
});

interface Props {
  readOnly?: boolean;
  size?: FieldProps['size'];
  name: keyof SocialLinkFields;
}

const TokenInfoFieldSocialLink = ({ readOnly, size, name }: Props) => {
  const { t } = useTranslation();
  const SETTINGS = getSettings(t);

  const endElement = React.useCallback(({ field }: { field: ControllerRenderProps<Fields> }) => {
    return <IconSvg name={ SETTINGS[name].icon } boxSize="60px" px={ 4 } color={ field.value ? SETTINGS[name].color : '#718096' }/>;
  }, [ name, t ]);

  return (
    <FormFieldUrl<Fields>
      name={ name }
      placeholder={ SETTINGS[name].label }
      group={{
        endElement,
      }}
      readOnly={ readOnly }
      size={ size }
    />
  );
};

export default React.memo(TokenInfoFieldSocialLink);
