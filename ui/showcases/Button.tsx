import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonGroupRadio } from 'toolkit/chakra/button';
import { Checkbox } from 'toolkit/chakra/checkbox';
import { Link } from 'toolkit/chakra/link';
import { PopoverContent, PopoverRoot, PopoverTrigger, PopoverBody } from 'toolkit/chakra/popover';
import { Tooltip } from 'toolkit/chakra/tooltip';
import { BACKGROUND_DEFAULT } from 'ui/home/HeroBanner';
import IconSvg from 'ui/shared/IconSvg';

import { Section, Container, SectionHeader, SamplesStack, Sample, SectionSubHeader } from './parts';

const ButtonShowcase = () => {
  const { t } = useTranslation();
  return (
    <Container value="button">
      <Section>
        <SectionHeader>{t('common.common.size', 'Size')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.size_2xs', 'size: 2xs')}>
            <Button size="2xs">{t('common.common.content', 'Content')}</Button>
          </Sample>
          <Sample label={t('common.common.size_xs', 'size: xs')}>
            <Button size="xs">{t('common.common.content', 'Content')}</Button>
          </Sample>
          <Sample label={t('common.common.size_sm', 'size: sm')}>
            <Button size="sm">{t('common.common.content', 'Content')}</Button>
          </Sample>
          <Sample label={t('common.common.size_md', 'size: md')}>
            <Button size="md">{t('common.common.content', 'Content')}</Button>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.variants', 'Variants')}</SectionHeader>
        <SamplesStack>

          <Sample label={t('common.common.variant_solid', 'variant: solid')}>
            <Button variant="solid">{t('common.common.default', 'Default')}</Button>
            <Button variant="solid" data-hover>{t('common.common.hovered', 'Hovered')}</Button>
            <Button variant="solid" disabled>{t('common.common.disabled', 'Disabled')}</Button>
            <Button variant="solid" loading>{t('common.common.loading', 'Loading')}</Button>
            <Button variant="solid" loadingSkeleton>{t('common.common.loading_skeleton', 'Loading Skeleton')}</Button>
          </Sample>

          <Sample label={t('common.common.variant_outline', 'variant: outline')}>
            <Button variant="outline">{t('common.common.default', 'Default')}</Button>
            <Button variant="outline" data-hover>{t('common.common.hovered', 'Hovered')}</Button>
            <Button variant="outline" disabled>{t('common.common.disabled', 'Disabled')}</Button>
            <Button variant="outline" loading>{t('common.common.loading', 'Loading')}</Button>
            <Button variant="outline" loadingSkeleton>{t('common.common.loading_skeleton', 'Loading Skeleton')}</Button>
          </Sample>

          <Sample label={t('common.common.variant_link', 'variant: link')}>
            <Button variant="link">{t('common.common.default', 'Default')}</Button>
            <Button variant="link" data-hover>{t('common.common.hovered', 'Hovered')}</Button>
            <Button variant="link" disabled>{t('common.common.disabled', 'Disabled')}</Button>
            <Button variant="link" loadingSkeleton>{t('common.common.disabled', 'Disabled')}</Button>
          </Sample>

          <Sample label={t('common.common.variant_dropdown', 'variant: dropdown')}>
            <PopoverRoot>
              <PopoverTrigger>
                <Button variant="dropdown">{t('common.common.default', 'Default')}</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody>
                  {t('common.common.popover_content', 'Popover content')}
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
            <PopoverRoot>
              <PopoverTrigger>
                <Button variant="dropdown" data-hover>{t('common.common.hovered', 'Hovered')}</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody>
                  {t('common.common.popover_content', 'Popover content')}
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
            <PopoverRoot>
              <PopoverTrigger>
                <Button variant="dropdown" expanded>{t('common.common.expended', 'Expended')}</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody>
                  {t('common.common.popover_content', 'Popover content')}
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
            <PopoverRoot>
              <PopoverTrigger>
                <Button variant="dropdown" selected>{t('common.common.selected', 'Selected')}</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody display="flex" flexDirection="column" gap={ 2 }>
                  <Checkbox defaultChecked>{t('common.common.first_option', 'First option')}</Checkbox>
                  <Checkbox>{t('common.common.second_option', 'Second option')}</Checkbox>
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
            <Button variant="dropdown" disabled>{t('common.common.disabled', 'Disabled')}</Button>
            <Button variant="dropdown" loading>{t('common.common.loading', 'Loading')}</Button>
            <Button variant="dropdown" loadingSkeleton>{t('common.common.loading_skeleton', 'Loading Skeleton')}</Button>

            <PopoverRoot>
              <Tooltip content={t('common.common.tooltip_content')}>
                <div>
                  <PopoverTrigger>
                    <Button variant="dropdown" size="md" px={ 2 }>
                      <IconSvg name="explorer" boxSize={ 5 }/>
                      {t('common.common.with_tooltip', 'With tooltip')}
                    </Button>
                  </PopoverTrigger>
                </div>
              </Tooltip>
              <PopoverContent>
                <PopoverBody>
                  {t('common.common.popover_content', 'Popover content')}
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
          </Sample>

          <Sample label={t('common.common.variant_header', 'variant: header')}>
            <Button variant="header">{t('common.common.default', 'Default')}</Button>
            <Button variant="header" data-hover>{t('common.common.hovered', 'Hovered')}</Button>
            <Button variant="header" loading loadingText="Loading">{t('common.common.loading', 'Loading')}</Button>
            <PopoverRoot>
              <PopoverTrigger>
                <Button variant="header" selected>{t('common.common.selected', 'Selected')}</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody>
                  {t('common.common.user_profile_menu_content', 'User profile menu content')}
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
            <PopoverRoot>
              <PopoverTrigger>
                <Button variant="header" selected expanded>{t('common.common.selected_and_expended', 'Selected & expended')}</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody>
                  {t('common.common.user_profile_menu_content', 'User profile menu content')}
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
            <PopoverRoot>
              <PopoverTrigger>
                <Button variant="header" selected highlighted>{t('common.common.selected_and_highlighted', 'Selected & highlighted')}</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody>
                  {t('common.common.user_profile_menu_content', 'User profile menu content')}
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
          </Sample>

          <Sample label={t('common.common.variant_hero', 'variant: hero')} p={ 6 } background={ BACKGROUND_DEFAULT }>
            <Button variant="hero">{t('common.common.default', 'Default')}</Button>
            <Button variant="hero" data-hover>{t('common.common.hovered', 'Hovered')}</Button>
            <Button variant="hero" loading loadingText="Loading">{t('common.common.loading', 'Loading')}</Button>
            <PopoverRoot>
              <PopoverTrigger>
                <Button variant="hero" selected>{t('common.common.selected', 'Selected')}</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody>
                  {t('common.common.user_profile_menu_content', 'User profile menu content')}
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
            <PopoverRoot>
              <PopoverTrigger>
                <Button variant="hero" selected expanded>{t('common.common.selected_and_expended', 'Selected & expended')}</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody>
                  {t('common.common.user_profile_menu_content', 'User profile menu content')}
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
          </Sample>

          <Sample label={t('common.common.variant_subtle', 'variant: subtle')}>
            <Button variant="subtle" size="xs">{t('common.common.default_now_1h', 'Default: Now+1h')}</Button>
            <Button variant="subtle" size="xs" data-hover>{t('common.common.hovered_now_1h', 'Hovered: Now+1h')}</Button>
            <Button variant="subtle" size="xs" disabled>{t('common.common.disabled_now_1h', 'Disabled: Now+1h')}</Button>
            <Button variant="subtle" size="xs" loadingSkeleton>{t('common.common.loading_skeleton', 'Loading Skeleton')}</Button>
          </Sample>

          <Sample label={t('common.common.variant_plain', 'variant: plain')}>
            <Button variant="plain">{t('common.common.default', 'Default')}</Button>
            <Button variant="plain" data-hover>{t('common.common.hovered', 'Hovered')}</Button>
            <Button variant="plain" disabled>{t('common.common.disabled', 'Disabled')}</Button>
            <Button variant="plain" loadingSkeleton>{t('common.common.loading_skeleton', 'Loading Skeleton')}</Button>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.loading', 'Loading')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.loading_true_loadingtext_loading', "loading: true, loadingText: 'Loading'")}>
            <Button loading loadingText="Loading">{t('common.common.content', 'Content')}</Button>
            <Button loading loadingText="Loading" size="sm">{t('common.common.content', 'Content')}</Button>
            <Button loading loadingText="Loading" size="xs">{t('common.common.content', 'Content')}</Button>
            <Button loading loadingText="Loading" size="2xs">{t('common.common.content', 'Content')}</Button>
          </Sample>
          <Sample label={t('common.common.loading_true_loadingtext_undefined', 'loading: true, loadingText: undefined')}>
            <Button loading>{t('common.common.content', 'Content')}</Button>
          </Sample>
          <Sample label={t('common.common.loadingskeleton_true', 'loadingSkeleton: true')}>
            <Button loadingSkeleton>{t('common.common.content', 'Content')}</Button>
            <Button loadingSkeleton variant="outline">{t('common.common.content', 'Content')}</Button>
            <Button loadingSkeleton variant="dropdown">{t('common.common.content', 'Content')}</Button>
            <Button loadingSkeleton variant="subtle">{t('common.common.content', 'Content')}</Button>
          </Sample>
        </SamplesStack>
      </Section>

      <Section>
        <SectionHeader>{t('common.common.examples', 'Examples')}</SectionHeader>
        <SectionSubHeader>{t('common.common.as_link', 'As Link')}</SectionSubHeader>
        <SamplesStack>
          <Sample>
            <Link href="/" asChild>
              <Button>{t('common.common.i_am_link', 'I am link')}</Button>
            </Link>
          </Sample>
        </SamplesStack>

        <SectionSubHeader>{t('common.common.button_group_radio', 'Button Group Radio')}</SectionSubHeader>
        <SamplesStack>
          <Sample>
            <ButtonGroupRadio>
              <Button value={t('common.common.option1')}>{t('common.common.option_1', 'Option 1')}</Button>
              <Button value={t('common.common.option2')}>{t('common.common.option_2', 'Option 2')}</Button>
              <Button value={t('common.common.option3')}>{t('common.common.option_3', 'Option 3')}</Button>
            </ButtonGroupRadio>
            <ButtonGroupRadio loading>
              <Button value={t('common.common.option1')}>{t('common.common.option_1', 'Option 1')}</Button>
              <Button value={t('common.common.option2')}>{t('common.common.option_2', 'Option 2')}</Button>
              <Button value={t('common.common.option3')}>{t('common.common.option_3', 'Option 3')}</Button>
            </ButtonGroupRadio>
          </Sample>
        </SamplesStack>
      </Section>

    </Container>
  );
};

export default React.memo(ButtonShowcase);
