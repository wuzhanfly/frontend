import React from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton } from 'toolkit/chakra/icon-button';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from 'toolkit/chakra/menu';
import IconSvg from 'ui/shared/IconSvg';

import { Section, Container, SectionHeader, SamplesStack, Sample } from './parts';

const MenuShowcase = () => {
  const { t } = useTranslation();

  return (
    <Container value="menu">
      <Section>
        <SectionHeader>{t('common.common.variant', 'Variant')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.variant_subtle', 'variant: subtle')}>
            <MenuRoot>
              <MenuTrigger asChild>
                <IconButton variant="icon_background" size="md">
                  <IconSvg name="dots"/>
                </IconButton>
              </MenuTrigger>
              <MenuContent>
                <MenuItem value="refresh-metadata">{t('common.common.refresh_metadata', 'Refresh metadata')}</MenuItem>
                <MenuItem value="add-token-info">{t('common.common.add_token_info', 'Add token info')}</MenuItem>
                <MenuItem value="add-private-tag">{t('common.common.add_private_tag', 'Add private tag')}</MenuItem>
                <MenuItem value="add-public-tag">{t('common.common.add_public_tag', 'Add public tag')}</MenuItem>
              </MenuContent>
            </MenuRoot>

            <MenuRoot>
              <MenuTrigger asChild>
                <IconButton variant="icon_background" size="md" loadingSkeleton>
                  <IconSvg name="dots"/>
                </IconButton>
              </MenuTrigger>
              <MenuContent>
                <MenuItem value="refresh-metadata">{t('common.common.refresh_metadata', 'Refresh metadata')}</MenuItem>
                <MenuItem value="add-token-info">{t('common.common.add_token_info', 'Add token info')}</MenuItem>
                <MenuItem value="add-private-tag">{t('common.common.add_private_tag', 'Add private tag')}</MenuItem>
                <MenuItem value="add-public-tag">{t('common.common.add_public_tag', 'Add public tag')}</MenuItem>
              </MenuContent>
            </MenuRoot>
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(MenuShowcase);
