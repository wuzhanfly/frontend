import type { FormSubmitResultItem } from './types';

const { t } = (() => {
  // Mock translation function for tests
  const mockT = (key: string) => {
    const keyMap: Record<string, string> = {
      'common.common.john_doe': 'John Doe',
      'common.common.jonhdoeduckme': 'john@duckme.com',
      'common.common.quack_quack': 'Quack quack!',
      'common.common.unicorn_uproar': 'Unicorn Uproar',
      'common.common.hello': 'Hello',
      'common.common.hello_it_is_me_i_was_wondering': 'Hello, it is me, I was wondering',
      'common.common.duck_owner_': 'Duck owner',
      'common.common.some_error': 'Some error',
      'common.common.another_nasty_error': 'Another nasty error',
    };
    return keyMap[key] || key;
  };
  return { t: mockT };
})();

export const address1 = '0xd789a607CEac2f0E14867de4EB15b15C9FFB5851';
export const address2 = '0xd789a607CEac2f0E14867de4EB15b15C9FFB5852';
export const address3 = '0xd789a607CEac2f0E14867de4EB15b15C9FFB5853';
export const address4 = '0xd789a607CEac2f0E14867de4EB15b15C9FFB5854';
export const address5 = '0xd789a607CEac2f0E14867de4EB15b15C9FFB5855';

export const baseFields = {
  requesterName: t('common.common.john_doe'),
  requesterEmail: t('common.common.jonhdoeduckme'),
  companyName: 'DuckDuckMe',
  companyWebsite: 'https://duck.me',
  description: t('common.common.quack_quack'),
};

export const tag1 = {
  name: t('common.common.unicorn_uproar'),
  tagType: 'name' as const,
  meta: {
    tagUrl: 'https://example.com',
    bgColor: '#ff1493',
    textColor: '#FFFFFF',
    tooltipDescription: undefined,
  },
};

export const tag2 = {
  name: t('common.common.hello'),
  tagType: 'generic' as const,
  meta: {
    tooltipDescription: t('common.common.hello_it_is_me_i_was_wondering'),
  },
};

export const tag3 = {
  name: t('common.common.duck_owner_'),
  tagType: 'classifier' as const,
  meta: {
    bgColor: '#fff300',
  },
};

export const allSuccessResponses: Array<FormSubmitResultItem> = [
  address1,
  address2,
  address3,
  address4,
  address5,
]
  .map((address) => ([ tag1, tag2, tag3 ].map((tag) => ({
    error: null,
    payload: {
      ...baseFields,
      ...tag,
      address,
    },
  }))))
  .flat();

export const mixedResponses: Array<FormSubmitResultItem> = [
  // address1
  {
    error: null,
    payload: { address: address1, ...tag1 },
  },
  {
    error: t('common.common.some_error'),
    payload: { address: address1, ...tag2 },
  },
  {
    error: t('common.common.some_error'),
    payload: { address: address1, ...tag3 },
  },
  // address2
  {
    error: t('common.common.some_error'),
    payload: { address: address2, ...tag2 },
  },
  {
    error: t('common.common.some_error'),
    payload: { address: address2, ...tag3 },
  },
  // address3
  {
    error: t('common.common.some_error'),
    payload: { address: address3, ...tag1 },
  },
  {
    error: t('common.common.another_nasty_error'),
    payload: { address: address3, ...tag2 },
  },
  {
    error: null,
    payload: { address: address3, ...tag3 },
  },
].map((item) => ({ ...item, payload: { ...item.payload, ...baseFields } }));
