import i18n from 'i18next';

export default function getConfirmationString(durations: Array<number>) {
  const t = i18n.t.bind(i18n);

  if (durations.length === 0) {
    return '';
  }

  const [ lower, upper ] = durations.map((time) => time / 1_000);

  if (!upper) {
    // return `Confirmed within ${ lower.toLocaleString() } secs`;
    return t('transactions.common.confirmed_within_secs', { seconds: lower.toLocaleString() });
  }

  if (lower === 0) {
    // return `Confirmed within <= ${ upper.toLocaleString() } secs`;
    return t('transactions.common.confirmed_within_less_than_secs', { seconds: upper.toLocaleString() });
  }

  // return `Confirmed within ${ lower.toLocaleString() } - ${ upper.toLocaleString() } secs`;
  return t('transactions.common.confirmed_within_range_secs', { lower: lower.toLocaleString(), upper: upper.toLocaleString() });
}
