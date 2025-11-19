/* eslint-disable max-len */
import { noop } from 'es-toolkit';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'toolkit/chakra/button';
import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from 'toolkit/chakra/dialog';

import { Section, Container, SectionHeader, SamplesStack, Sample } from './parts';

const CONTENT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const DialogShowcase = () => {
  const { t } = useTranslation();

  return (
    <Container value="dialog">
      <Section>
        <SectionHeader>{t('common.common.size', 'Size')}</SectionHeader>
        <SamplesStack>
          <Sample label={t('common.common.size_sm', 'size: sm')}>
            <DialogRoot size="sm">
              <DialogTrigger asChild>
                <Button size="sm">
                  {t('common.common.open_dialog', 'Open Dialog')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('common.common.dialog_title', 'Dialog Title')}</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <p>{ CONTENT }</p>
                </DialogBody>
                <DialogFooter>
                  <Button>{t('common.common.save', 'Save')}</Button>
                  <DialogActionTrigger asChild>
                    <Button variant="link">{t('common.common.ill_do_it_later')}</Button>
                  </DialogActionTrigger>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
          </Sample>

          <Sample label={t('common.common.size_md', 'size: md')}>
            <DialogRoot size="md">
              <DialogTrigger asChild>
                <Button size="sm">
                  {t('common.common.open_dialog', 'Open Dialog')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader onBackToClick={ noop }>
                  <DialogTitle>{t('common.common.dialog_title', 'Dialog Title')}</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <p>{ CONTENT }</p>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button variant="outline">{t('common.common.cancel', 'Cancel')}</Button>
                  </DialogActionTrigger>
                  <Button>{t('common.common.save', 'Save')}</Button>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
          </Sample>

          <Sample label={t('common.common.size_full', 'size: full')}>
            <DialogRoot size="full">
              <DialogTrigger asChild>
                <Button size="sm">
                  {t('common.common.open_dialog', 'Open Dialog')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('common.common.dialog_title', 'Dialog Title')}</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <p>{ CONTENT }</p>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button variant="outline">{t('common.common.cancel', 'Cancel')}</Button>
                  </DialogActionTrigger>
                  <Button>{t('common.common.save', 'Save')}</Button>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
          </Sample>
        </SamplesStack>
      </Section>

    </Container>
  );
};

export default React.memo(DialogShowcase);
