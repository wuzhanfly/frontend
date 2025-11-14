import React from 'react';
import { useTranslation } from 'react-i18next';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot, useAccordion } from 'toolkit/chakra/accordion';
import CopyToClipboard from 'ui/shared/CopyToClipboard';

import SwaggerUI from './SwaggerUI';
import { getRestApiSections } from './utils';

const RestApi = () => {
  const { t } = useTranslation();
  const apiSections = getRestApiSections(t);
  const { value, onValueChange, scrollToItemFromUrl } = useAccordion(apiSections.map(section => ({ id: section.id })));

  React.useEffect(() => {
    scrollToItemFromUrl();
  }, [ scrollToItemFromUrl ]);

  if (apiSections.length === 0) {
    return null;
  }

  if (apiSections.length === 1) {
    return <SwaggerUI { ...apiSections[0].swagger }/>;
  }

  return (
    <AccordionRoot onValueChange={ onValueChange } value={ value }>
      { apiSections.map((section, index) => {
        if (!section) {
          return null;
        }
        return (
          <AccordionItem key={ index } value={ section.id }>
            <AccordionItemTrigger>{ section.title }</AccordionItemTrigger>
            <AccordionItemContent>
              <SwaggerUI { ...section.swagger }/>
              <CopyToClipboard text={ route({ pathname: '/api-docs' as const }) + '#' + section.id } type="link"/>
            </AccordionItemContent>
          </AccordionItem>
        );
      }) }
    </AccordionRoot>
  );
};

export default React.memo(RestApi);