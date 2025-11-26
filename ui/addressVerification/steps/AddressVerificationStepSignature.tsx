import { Box, chakra, Flex } from '@chakra-ui/react';
import { useAppKit } from '@reown/appkit/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { useSignMessage, useAccount, useSwitchChain } from 'wagmi';

import type {
  AddressVerificationFormSecondStepFields,
  AddressCheckStatusSuccess,
  AddressVerificationFormFirstStepFields,
  RootFields,
  AddressVerificationResponseError,
  AddressValidationResponseSuccess,
} from '../types';
import type { VerifiedAddress } from 'types/api/account';

import config from 'configs/app';
import useApiFetch from 'lib/api/useApiFetch';
import shortenString from 'lib/shortenString';
import { Alert } from 'toolkit/chakra/alert';
import { Button } from 'toolkit/chakra/button';
import { Link } from 'toolkit/chakra/link';
import { Radio, RadioGroup } from 'toolkit/chakra/radio';
import { FormFieldText } from 'toolkit/components/forms/fields/FormFieldText';
import { SIGNATURE_REGEXP } from 'toolkit/components/forms/validators/signature';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import AdminSupportText from 'ui/shared/texts/AdminSupportText';

type Fields = RootFields & AddressVerificationFormSecondStepFields;

type SignMethod = 'wallet' | 'manual';

interface Props extends AddressVerificationFormFirstStepFields, AddressCheckStatusSuccess {
  onContinue: (newItem: VerifiedAddress, signMethod: SignMethod) => void;
  noWeb3Provider?: boolean;
}

const AddressVerificationStepSignature = ({ address, signingMessage, contractCreator, contractOwner, onContinue, noWeb3Provider }: Props) => {
  const { t } = useTranslation();
  const [ signMethod, setSignMethod ] = React.useState<SignMethod>(noWeb3Provider ? 'manual' : 'wallet');

  const { open: openWeb3Modal } = useAppKit();
  const { isConnected } = useAccount();

  const formApi = useForm<Fields>({
    mode: 'onBlur',
    defaultValues: {
      message: signingMessage,
    },
  });
  const { handleSubmit, formState, setValue, getValues, setError, clearErrors, watch } = formApi;

  const apiFetch = useApiFetch();

  const signature = watch('signature');
  React.useEffect(() => {
    clearErrors('root');
  }, [ clearErrors, signature ]);

  const onFormSubmit: SubmitHandler<Fields> = React.useCallback(async(data) => {
    try {
      const body = {
        contractAddress: address,
        message: data.message,
        signature: data.signature,
      };

      const response = await apiFetch<'contractInfo:address_verification', AddressValidationResponseSuccess, AddressVerificationResponseError>(
        'contractInfo:address_verification',
        {
          fetchParams: { method: 'POST', body },
          pathParams: { chainId: config.chain.id, type: ':verify' },
        },
      );

      if (response.status !== 'SUCCESS') {
        const type = typeof response.status === 'number' ? 'UNKNOWN_STATUS' : response.status;
        return setError('root', { type, message: response.status === 'INVALID_SIGNER_ERROR' ? response.invalidSigner.signer : undefined });
      }

      onContinue(response.result.verifiedAddress, signMethod);
    } catch (error) {
      setError('root', { type: 'UNKNOWN_STATUS' });
    }
  }, [ address, apiFetch, onContinue, setError, signMethod ]);

  const onSubmit = handleSubmit(onFormSubmit);

  const { signMessage, isPending: isSigning } = useSignMessage();
  const { switchChainAsync } = useSwitchChain();

  const handleSignMethodChange = React.useCallback(({ value }: { value: string | null }) => {
    if (!value) {
      return;
    }

    setSignMethod(value as SignMethod);
    clearErrors('root');
  }, [ clearErrors ]);

  const handleOpenWeb3Modal = React.useCallback(() => {
    clearErrors('root');
    openWeb3Modal();
  }, [ clearErrors, openWeb3Modal ]);

  const handleWeb3SignClick = React.useCallback(async() => {
    clearErrors('root');

    if (!isConnected) {
      return setError('root', { type: 'manual', message: 'Please connect to your Web3 wallet first' });
    }

    await switchChainAsync({ chainId: Number(config.chain.id) });
    const message = getValues('message');
    signMessage({ message }, {
      onSuccess: (data) => {
        setValue('signature', data);
        onSubmit();
      },
      onError: (error) => {
        return setError('root', { type: 'SIGNING_FAIL', message: (error as Error)?.message || t('shared.common.oops_something_went_wrong') });
      },
    });
  }, [ clearErrors, isConnected, getValues, signMessage, setError, setValue, onSubmit, switchChainAsync ]);

  const handleManualSignClick = React.useCallback(() => {
    clearErrors('root');
    onSubmit();
  }, [ clearErrors, onSubmit ]);

  const button = (() => {
    if (signMethod === 'manual') {
      return (
        <Button
          onClick={ handleManualSignClick }
          loading={ formState.isSubmitting }
          loadingText={ t('common.common.verifying') }
        >
          {t('common.common.verify')}
        </Button>
      );
    }

    return (
      <Button
        onClick={ isConnected ? handleWeb3SignClick : handleOpenWeb3Modal }
        loading={ formState.isSubmitting || isSigning }
        loadingText={ isSigning ? t('common.common.signing') : t('common.common.verifying') }
      >
        { isConnected ? t('common.common.sign_and_verify') : t('staking.common.connect_wallet') }
      </Button>
    );
  })();

  const contactUsLink = <span>contact us <Link href="mailto:help@blockscout.com" rel="noopener noreferrer">help@blockscout.com</Link></span>;

  const rootError = (() => {
    switch (formState.errors.root?.type) {
      case 'INVALID_SIGNATURE_ERROR': {
        return <span>{t('address_verification.common.signature_could_not_be_processed')}</span>;
      }
      case 'VALIDITY_EXPIRED_ERROR': {
        return <span>{t('address_verification.common.verification_message_expired')}</span>;
      }
      case 'SIGNING_FAIL': {
        return <span>{ formState.errors.root.message }</span>;
      }
      case 'INVALID_SIGNER_ERROR': {
        const signer = shortenString(formState.errors.root.message || '');
        const expectedSigners = [ contractCreator, contractOwner ].filter(Boolean).map(s => shortenString(s)).join(', ');
        return (
          <Box>
          <span>{t('address_verification.common.not_creator_owner_of_contract')} </span>
          <span>{ signer }</span>
          <span> {t('address_verification.common.only_expected_signers_can_verify')} </span>
          <span>{ expectedSigners }</span>
          <span> {t('address_verification.common.can_verify_ownership')}</span>
        </Box>
        );
      }
      case 'UNKNOWN_STATUS': {
        return (
          <Box>
            <span>{t('address_verification.common.unable_to_process_verification')} </span>
            { contactUsLink }
            <span> {t('address_verification.common.for_further_assistance')}</span>
          </Box>
        );
      }
      case undefined: {
        return null;
      }
    }
  })();

  return (
    <FormProvider { ...formApi }>
      <form noValidate onSubmit={ onSubmit }>
        { rootError && <Alert status="warning" mb={ 6 }>{ rootError }</Alert> }
        <Box mb={ 8 }>
          <span>{t('address_verification.common.please_select_address_and_copy_message')} </span>
          <Link href="https://docs.blockscout.com/using-blockscout/my-account/verified-addresses/copy-and-sign-message" external noIcon>
            {t('address_verification.common.additional_instructions')}
          </Link>
          <span>. {t('address_verification.common.if_you_do_not_see_your_address')} </span>
          { contactUsLink }
          <span> {t('address_verification.common.for_further_assistance')}</span>
        </Box>
        { (contractOwner || contractCreator) && (
          <Flex flexDir="column" rowGap={ 4 } mb={ 4 }>
            { contractCreator && (
              <Box>
                <chakra.span fontWeight={ 600 }>Contract creator: </chakra.span>
                <chakra.span>{ contractCreator }</chakra.span>
              </Box>
            ) }
            { contractOwner && (
              <Box>
                <chakra.span fontWeight={ 600 }>Contract owner: </chakra.span>
                <chakra.span>{ contractOwner }</chakra.span>
              </Box>
            ) }
          </Flex>
        ) }
        <Flex rowGap={ 5 } flexDir="column">
          <Flex flexDir="column">
            <CopyToClipboard text={ signingMessage } ml="auto"/>
            <FormFieldText<Fields>
              name="message"
              placeholder={ t('common.common.message_to_sign') }
              required
              asComponent="Textarea"
              readOnly
              inputProps={{
                h: { base: '175px', lg: '100px' },
                minH: 'auto',
              }}
            />
          </Flex>
          { !noWeb3Provider && (
            <RadioGroup
              onValueChange={ handleSignMethodChange }
              value={ signMethod }
              display="flex"
              flexDir="column"
              rowGap={ 4 }
            >
              <Radio value="wallet">{t('address_verification.common.sign_via_web3_wallet')}</Radio>
              <Radio value="manual">{t('address_verification.common.sign_manually')}</Radio>
            </RadioGroup>
          ) }
          { signMethod === 'manual' && (
            <FormFieldText<Fields>
              name="signature"
              placeholder={ t('common.common.signature_hash') }
              required
              rules={{ pattern: SIGNATURE_REGEXP }}
              bgColor="dialog.bg"
            />
          ) }
        </Flex>
        <Flex alignItems={{ base: 'flex-start', lg: 'center' }} mt={ 8 } columnGap={ 5 } rowGap={ 2 } flexDir={{ base: 'column', lg: 'row' }}>
          { button }
          <AdminSupportText/>
        </Flex>
      </form>
    </FormProvider>
  );
};

export default React.memo(AddressVerificationStepSignature);
