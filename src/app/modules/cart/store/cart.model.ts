export enum CurrencyPairsRates {
  USDRUB = 'USDRUB',
  USDEUR = 'USDEUR',
  USDGBP = 'USDGBP',
  USDJPY = 'USDJPY'
}

export const CurrencyPairsNames = {
  RUB: 'rubles',
  EUR: 'euros',
  GBP: 'pounds',
  JPY: 'yens',
  USD: 'US dollars'
};

export interface Product {
  uuid: string;
  price: number;
  name: string;
  image: string;
  createdAt: string;
}
