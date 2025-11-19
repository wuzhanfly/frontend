import React from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox } from 'toolkit/chakra/checkbox';
import { IconButton } from 'toolkit/chakra/icon-button';
import { PopoverBody, PopoverContent, PopoverTrigger, PopoverRoot } from 'toolkit/chakra/popover';
import IconSvg from 'ui/shared/IconSvg';

import { Section, Container, SectionHeader, SamplesStack, Sample } from './parts';

const IconButtonShowcase = () => {
  const { t } = useTranslation();

  return (
    <Container value="icon-button">
      <Section>
        <SectionHeader>{t('common.common.variant', 'Variant')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.variant_icon_secondary', 'variant: icon_secondary')}>
            <IconButton size="md" variant="icon_secondary">
              <IconSvg name="info"/>
            </IconButton>
            <IconButton size="md" variant="icon_secondary" data-hover>
              <IconSvg name="info"/>
            </IconButton>
            <IconButton size="md" variant="icon_secondary" disabled>
              <IconSvg name="info"/>
            </IconButton>
            <IconButton size="md" variant="icon_secondary" selected>
              <IconSvg name="info"/>
            </IconButton>
            <IconButton size="md" variant="icon_secondary" selected data-hover>
              <IconSvg name="info"/>
            </IconButton>
            <IconButton size="md" variant="icon_secondary" selected disabled>
              <IconSvg name="info"/>
            </IconButton>
          </Sample>

          <Sample label={t('common.common.variant_icon_background', 'variant: icon_background')}>
            <IconButton size="md" variant="icon_background">
              <IconSvg name="heart_outline"/>
            </IconButton>
            <IconButton size="md" variant="icon_background" data-hover>
              <IconSvg name="heart_outline"/>
            </IconButton>
            <IconButton size="md" variant="icon_background" disabled>
              <IconSvg name="heart_outline"/>
            </IconButton>
            <IconButton size="md" variant="icon_background" selected>
              <IconSvg name="heart_filled"/>
            </IconButton>
            <IconButton size="md" variant="icon_background" selected data-hover>
              <IconSvg name="heart_filled"/>
            </IconButton>
            <IconButton size="md" variant="icon_background" selected disabled>
              <IconSvg name="heart_filled"/>
            </IconButton>
          </Sample>

          <Sample label={t('common.common.variant_dropdown', 'variant: dropdown')}>
            <PopoverRoot>
              <PopoverTrigger>
                <IconButton size="md" variant="dropdown">
                  <IconSvg name="filter"/>
                </IconButton>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody>
                  {t('common.common.popover_content', 'Popover content')}
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
            <PopoverRoot>
              <PopoverTrigger>
                <IconButton size="md" variant="dropdown" expanded>
                  <IconSvg name="filter"/>
                </IconButton>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody>
                  {t('common.common.popover_content', 'Popover content')}
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
            <PopoverRoot>
              <PopoverTrigger>
                <IconButton size="md" variant="dropdown" selected>
                  <IconSvg name="filter"/>
                </IconButton>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody display="flex" flexDirection="column" gap={ 2 }>
                  <Checkbox defaultChecked>{t('common.common.first_option', 'First option')}</Checkbox>
                  <Checkbox>{t('common.common.second_option', 'Second option')}</Checkbox>
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
            <IconButton size="md" variant="dropdown" disabled>
              <IconSvg name="filter"/>
            </IconButton>
            <IconButton size="md" variant="dropdown" loading>
              <IconSvg name="filter"/>
            </IconButton>
            <IconButton size="md" variant="dropdown" loadingSkeleton>
              <IconSvg name="filter"/>
            </IconButton>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.size', 'Size')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.size_2xs', 'size: 2xs')}>
            <IconButton size="2xs" variant="icon_secondary" outline="1px dashed lightpink">
              <IconSvg name="star_outline"/>
            </IconButton>
          </Sample>
          <Sample label={t('common.common.size_2xs_alt', 'size: 2xs_alt')}>
            <IconButton size="2xs_alt" variant="icon_secondary" outline="1px dashed lightpink">
              <IconSvg name="plus"/>
            </IconButton>
          </Sample>
          <Sample label={t('common.common.size_md', 'size: md')}>
            <IconButton size="md" variant="icon_secondary" outline="1px dashed lightpink">
              <IconSvg name="star_outline"/>
            </IconButton>
          </Sample>
        </SamplesStack>
      </Section>
    </Container>
  );
};

export default React.memo(IconButtonShowcase);
