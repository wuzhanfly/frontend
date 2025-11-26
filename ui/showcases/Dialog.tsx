/* eslint-disable max-len */
import { noop } from 'es-toolkit';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'toolkit/chakra/button';
import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from 'toolkit/chakra/dialog';

import { Section, Container, SectionHeader, SamplesStack, Sample } from './parts';

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
                  <p>{t('showcases.dialog.content')}</p>
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
                  <p>{t('showcases.dialog.content')}</p>
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
                  <p>{t('showcases.dialog.content')}</p>
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
