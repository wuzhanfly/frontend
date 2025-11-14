import React from 'react';
import { useTranslation } from 'react-i18next';

import useIsMobile from 'lib/hooks/useIsMobile';
import { useColorMode } from 'toolkit/chakra/color-mode';
import { Switch } from 'toolkit/chakra/switch';
import { TabsList, TabsRoot, TabsTrigger } from 'toolkit/chakra/tabs';
import PageTitle from 'ui/shared/Page/PageTitle';
import AccordionsShowcase from 'ui/showcases/Accordion';
import AlertShowcase from 'ui/showcases/Alert';
import BadgeShowcase from 'ui/showcases/Badge';
import ButtonShowcase from 'ui/showcases/Button';
import CheckboxShowcase from 'ui/showcases/Checkbox';
import ClipboardShowcase from 'ui/showcases/Clipboard';
import CloseButtonShowcase from 'ui/showcases/CloseButton';
import CollapsibleShowcase from 'ui/showcases/Collapsible';
import ContentLoaderShowcase from 'ui/showcases/ContentLoader';
import DialogShowcase from 'ui/showcases/Dialog';
import FieldShowcase from 'ui/showcases/Field';
import IconButtonShowcase from 'ui/showcases/IconButton';
import InputShowcase from 'ui/showcases/Input';
import LinkShowcase from 'ui/showcases/Link';
import MenuShowcase from 'ui/showcases/Menu';
import PaginationShowcase from 'ui/showcases/Pagination';
import PinInputShowcase from 'ui/showcases/PinInput';
import PopoverShowcase from 'ui/showcases/Popover';
import ProgressShowcase from 'ui/showcases/Progress';
import ProgressCircleShowcase from 'ui/showcases/ProgressCircle';
import RadioShowcase from 'ui/showcases/Radio';
import RatingShowcase from 'ui/showcases/Rating';
import SelectShowcase from 'ui/showcases/Select';
import SkeletonShowcase from 'ui/showcases/Skeleton';
import SpinnerShowcase from 'ui/showcases/Spinner';
import SwitchShowcase from 'ui/showcases/Switch';
import TableShowcase from 'ui/showcases/Table';
import TabsShowcase from 'ui/showcases/Tabs';
import TagShowcase from 'ui/showcases/Tag';
import TextareaShowcase from 'ui/showcases/Textarea';
import ToastShowcase from 'ui/showcases/Toast';
import TooltipShowcase from 'ui/showcases/Tooltip';

const ChakraShowcases = () => {
  const { t } = useTranslation();
  const colorMode = useColorMode();
  const isMobile = useIsMobile();

  const tabs = [
    { label: t('common.common.accordion'), value: 'accordion', component: <AccordionsShowcase/> },
    { label: t('shared.common.alert'), value: 'alert', component: <AlertShowcase/> },
    { label: t('common.common.badge'), value: 'badge', component: <BadgeShowcase/> },
    { label: 'Button', value: 'button', component: <ButtonShowcase/> },
    { label: t('common.common.checkbox'), value: 'checkbox', component: <CheckboxShowcase/> },
    { label: t('common.common.clipboard'), value: 'clipboard', component: <ClipboardShowcase/> },
    { label: t('common.common.close_button'), value: 'close-button', component: <CloseButtonShowcase/> },
    { label: t('common.common.collapsible'), value: 'collapsible', component: <CollapsibleShowcase/> },
    { label: t('common.common.content_loader'), value: 'content-loader', component: <ContentLoaderShowcase/> },
    { label: t('common.common.dialog'), value: 'dialog', component: <DialogShowcase/> },
    { label: t('common.common.icon_button'), value: 'icon-button', component: <IconButtonShowcase/> },
    { label: t('common.common.input'), value: 'input', component: <InputShowcase/> },
    { label: t('common.common.field'), value: 'field', component: <FieldShowcase/> },
    { label: t('common.common.link'), value: 'link', component: <LinkShowcase/> },
    { label: t('common.common.menu'), value: 'menu', component: <MenuShowcase/> },
    { label: t('common.common.pagination'), value: 'pagination', component: <PaginationShowcase/> },
    { label: t('common.common.progress'), value: 'progress', component: <ProgressShowcase/> },
    { label: t('common.common.progress_circle'), value: 'progress-circle', component: <ProgressCircleShowcase/> },
    { label: t('common.common.radio'), value: 'radio', component: <RadioShowcase/> },
    { label: t('common.common.rating'), value: 'rating', component: <RatingShowcase/> },
    { label: t('common.common.pin_input'), value: 'pin-input', component: <PinInputShowcase/> },
    { label: t('common.common.popover'), value: 'popover', component: <PopoverShowcase/> },
    { label: t('common.common.select'), value: 'select', component: <SelectShowcase/> },
    { label: t('common.common.skeleton'), value: 'skeleton', component: <SkeletonShowcase/> },
    { label: t('common.common.spinner'), value: 'spinner', component: <SpinnerShowcase/> },
    { label: t('common.common.switch'), value: 'switch', component: <SwitchShowcase/> },
    { label: t('common.common.table'), value: 'table', component: <TableShowcase/> },
    { label: t('common.common.tabs'), value: 'tabs', component: <TabsShowcase/> },
    { label: t('shared.common.tag'), value: 'tag', component: <TagShowcase/> },
    { label: t('common.common.textarea'), value: 'textarea', component: <TextareaShowcase/> },
    { label: t('common.common.toast'), value: 'toast', component: <ToastShowcase/> },
    { label: t('common.common.tooltip'), value: 'tooltip', component: <TooltipShowcase/> },
  ];

  return (
    <>
      <PageTitle title={t('common.common.chakra_ui_showcase')}/>
      <Switch onCheckedChange={ colorMode.toggleColorMode } checked={ colorMode.colorMode === 'dark' } mb={ 10 }>
        Color mode: { colorMode.colorMode }
      </Switch>

      <TabsRoot defaultValue="accordion" orientation={ isMobile ? 'horizontal' : 'vertical' }>
        <TabsList flexWrap="wrap" w="fit-content" whiteSpace="nowrap">
          { tabs.map((tab) => (
            <TabsTrigger key={ tab.value } value={ tab.value }>{ tab.label }</TabsTrigger>
          )) }
        </TabsList>
        { tabs.map((tab) => <React.Fragment key={ tab.value }>{ tab.component }</React.Fragment>) }
      </TabsRoot>
    </>
  );
};

export default React.memo(ChakraShowcases);
