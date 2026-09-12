export type Currency = 'PKR' | 'USD' | 'GBP' | 'AED' | 'CAD';

const RATES: Record<Currency, number> = {
  PKR: 1,
  USD: 0.0036,
  GBP: 0.0028,
  AED: 0.0132,
  CAD: 0.0049,
};

const SYMBOLS: Record<Currency, string> = {
  PKR: 'Rs. ',
  USD: '$',
  GBP: '£',
  AED: 'AED ',
  CAD: 'CA$',
};

export function formatPrice(amountPKR: number, currency: Currency = 'PKR'): string {
  const converted = Math.round(amountPKR * RATES[currency]);
  
  if (currency === 'PKR') {
    return `Rs. ${amountPKR.toLocaleString('en-PK')}`;
  }
  
  return `${SYMBOLS[currency]}${converted.toLocaleString('en-US')}`;
}
