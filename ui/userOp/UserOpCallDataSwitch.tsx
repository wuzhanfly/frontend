import { chakra, Flex } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Switch } from 'toolkit/chakra/switch';
import { Hint } from 'toolkit/components/Hint/Hint';

interface Props {
  id: string;
  onChange: (isChecked: boolean) => void;
  initialValue?: boolean;
  isDisabled?: boolean;
  className?: string;
}

const UserOpCallDataSwitch = ({ className, initialValue, isDisabled, onChange, id }: Props) => {
  const { t } = useTranslation();
  const [ isChecked, setIsChecked ] = React.useState(initialValue ?? false);

  const handleChange = React.useCallback(() => {
    setIsChecked((prevValue) => {
      const nextValue = !prevValue;
      onChange(nextValue);
      return nextValue;
    });
  }, [ onChange ]);

  return (
    <Flex ml="auto" alignItems="center" gap={ 2 }>
      <Switch
        className={ className }
        id={ id }
        checked={ isChecked }
        disabled={ isDisabled }
        onCheckedChange={ handleChange }
        direction="rtl"
        labelProps={{ fontWeight: '600', textStyle: 'sm' }}
      >
        <chakra.span hideBelow="lg">{t('user_ops.common.show_external_call_data')}</chakra.span>
        <chakra.span hideFrom="lg">{t('user_ops.common.external_call_data')}</chakra.span>
      </Switch>
      <Hint label={t('user_ops.common.inner_call_data_is_a_predicted_decoded_call_from_this_user_operation')}/>
    </Flex>
  );
};

export default React.memo(chakra(UserOpCallDataSwitch));
