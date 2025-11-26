export default function getConfirmationString(durations: Array<number>, t?: (key: string, values?: Record<string, string | number>) => string) {
  if (durations.length === 0) {
    return '';
  }

  const [ lower, upper ] = durations.map((time) => time / 1_000);

  if (!upper) {
    const key = 'transactions.common.confirmed_within_secs';
    return t ? t(key, { seconds: lower.toLocaleString() }) : `Confirmed within ${ lower.toLocaleString() } secs`;
  }

  if (lower === 0) {
    const key = 'transactions.common.confirmed_within_less_than_secs';
    return t ? t(key, { seconds: upper.toLocaleString() }) : `Confirmed within <= ${ upper.toLocaleString() } secs`;
  }

  const key = 'transactions.common.confirmed_within_range_secs';
  return t ? t(key, { lower: lower.toLocaleString(), upper: upper.toLocaleString() }) : `Confirmed within ${ lower.toLocaleString() } - ${ upper.toLocaleString() } secs`;
}
