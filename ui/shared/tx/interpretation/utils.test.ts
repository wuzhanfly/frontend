import { extractVariables, getStringChunks, checkSummary } from './utils';

const template = '{action_type} {source_amount} {native} into {destination_amount} {destination_token}';

it('transactions.common.extracts_variables_names', () => {
  const result = extractVariables(template);
  expect(result).toEqual([ 'action_type', 'source_amount', 'native', 'destination_amount', 'destination_token' ]);
});

it('transactions.common.split_string_without_capturing', () => {
  const result = getStringChunks(template);
  expect(result).toEqual([ '', ' ', ' ', ' into ', ' ', '' ]);
});

it('transactions.common.checks_that_summary_is_valid', () => {
  const result = checkSummary('{foo} {native} {bar} {wei}', { foo: { type: 'string', value: 'foo' }, bar: { type: 'string', value: 'bar' } });
  expect(result).toBe(true);
});

it('transactions.common.checks_that_summary_is_invalid', () => {

  // @ts-ignore:
  const result = checkSummary('{foo} {native} {bar}', { foo: { type: 'string', value: null }, bar: { type: 'string', value: 'bar' } });
  expect(result).toBe(false);
});
