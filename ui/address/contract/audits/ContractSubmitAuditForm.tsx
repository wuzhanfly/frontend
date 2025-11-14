import { VStack } from '@chakra-ui/react';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { SmartContractSecurityAuditSubmission } from 'types/api/contract';

import type { ResourceError } from 'lib/api/resources';
import useApiFetch from 'lib/api/useApiFetch';
import dayjs from 'lib/date/dayjs';
import { Button } from 'toolkit/chakra/button';
import { toaster } from 'toolkit/chakra/toaster';
import { FormFieldCheckbox } from 'toolkit/components/forms/fields/FormFieldCheckbox';
import { FormFieldEmail } from 'toolkit/components/forms/fields/FormFieldEmail';
import { FormFieldText } from 'toolkit/components/forms/fields/FormFieldText';
import { FormFieldUrl } from 'toolkit/components/forms/fields/FormFieldUrl';

interface Props {
  address?: string;
  onSuccess: () => void;
}

export type Inputs = {
  submitter_name: string;
  submitter_email: string;
  is_project_owner: boolean;
  project_name: string;
  project_url: string;
  audit_company_name: string;
  audit_report_url: string;
  audit_publish_date: string;
  comment?: string;
};

type AuditSubmissionErrors = {
  errors: Record<keyof Inputs, Array<string>>;
};

const ContractSubmitAuditForm = ({ address, onSuccess }: Props) => {
  const { t } = useTranslation();
  const containerRef = React.useRef<HTMLFormElement>(null);

  const apiFetch = useApiFetch();

  const formApi = useForm<Inputs>({
    mode: 'onTouched',
    defaultValues: { is_project_owner: false },
  });
  const { handleSubmit, formState, setError } = formApi;

  const onFormSubmit: SubmitHandler<Inputs> = React.useCallback(async(data) => {
    try {
      await apiFetch<'general:contract_security_audits', SmartContractSecurityAuditSubmission, AuditSubmissionErrors>('general:contract_security_audits', {
        pathParams: { hash: address },
        fetchParams: {
          method: 'POST',
          body: data,
        },
      });

      toaster.success({
        title: 'Success',
        description: 'Your audit report has been successfully submitted for review',
      });

      onSuccess();

    } catch (_error) {
      const error = _error as ResourceError<AuditSubmissionErrors>;
      // add scroll to the error field
      const errorMap = error?.payload?.errors;
      if (errorMap && Object.keys(errorMap).length) {
        (Object.keys(errorMap) as Array<keyof Inputs>).forEach((errorField) => {
          setError(errorField, { type: 'custom', message: errorMap[errorField].join(', ') });
        });
      } else {
        toaster.error({
          title: 'Error',
          description: (_error as ResourceError<{ message: string }>)?.payload?.message || t('marketplace.common.something_went_wrong_try_again'),
        });
      }
    }
  }, [ apiFetch, address, setError, onSuccess ]);

  return (
    <FormProvider { ...formApi }>
      <form noValidate onSubmit={ handleSubmit(onFormSubmit) } autoComplete="off" ref={ containerRef }>
        <VStack gap={ 5 } alignItems="flex-start">
          <FormFieldText<Inputs> name="submitter_name" required placeholder={ t('addresses.common.submitter_name') }/>
          <FormFieldEmail<Inputs> name="submitter_email" required placeholder={ t('addresses.common.submitter_email') }/>
          <FormFieldCheckbox<Inputs, 'is_project_owner'>
            name="is_project_owner"
            label={ t('addresses.common.im_the_contract_owner') }
          />
          <FormFieldText<Inputs> name="project_name" required placeholder={ t('common.common.project_name') }/>
          <FormFieldUrl<Inputs> name="project_url" required placeholder={ t('addresses.common.project_url') }/>
          <FormFieldText<Inputs> name="audit_company_name" required placeholder={ t('addresses.common.audit_company_name') }/>
          <FormFieldUrl<Inputs> name="audit_report_url" required placeholder={ t('addresses.common.audit_report_url') }/>
          <FormFieldText<Inputs>
            name="audit_publish_date"
            inputProps={{ type: 'date', max: dayjs().format('YYYY-MM-DD') }}
            required
            placeholder={ t('addresses.common.audit_publish_date') }
          />
          <FormFieldText<Inputs>
            name="comment"
            placeholder={ t('common.common.comment') }
            maxH="160px"
            rules={{ maxLength: 300 }}
            asComponent="Textarea"
          />
        </VStack>
        <Button
          type="submit"
          mt={ 8 }
          loading={ formState.isSubmitting }
          loadingText={ t('common.common.send_request') }
          disabled={ !formState.isDirty }
        >
          Send request
        </Button>
      </form>
    </FormProvider>
  );
};

export default React.memo(ContractSubmitAuditForm);
