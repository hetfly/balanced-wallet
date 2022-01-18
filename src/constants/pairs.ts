import { SupportedChainId as NetworkId } from 'packages/BalancedJs';

import {
  sICX,
  ICX,
  bnUSD,
  BALN,
  IUSDC,
  USDS,
  OMM,
  CFT,
  METX,
  IUSDT,
  GBET,
  sICX_YEOUIDO,
  ICX_YEOUIDO,
  bnUSD_YEOUIDO,
  BALN_YEOUIDO,
  IUSDC_YEOUIDO,
  USDS_YEOUIDO,
  OMM_YEOUIDO,
  CFT_YEOUIDO,
  sICX_SEJONG,
  ICX_SEJONG,
  bnUSD_SEJONG,
  BALN_SEJONG,
} from 'constants/tokens';
import { Token } from 'types/balanced-sdk-core';

import { NETWORK_ID } from './config';

export interface PairInfo {
  readonly chainId: number;
  readonly id: number;
  readonly name: string;
  readonly baseCurrencyKey: string;
  readonly quoteCurrencyKey: string;
  readonly rewards?: number;
  readonly baseToken: Token;
  readonly quoteToken: Token;
}

// this information contains the pairs the balanced supports
// eventually this information will saved in json file.

export const SUPPORTED_PAIRS_INFO: { [networkId: number]: PairInfo[] } = {
  [NetworkId.MAINNET]: [
    {
      chainId: 1,
      id: 1,
      name: 'sICX/ICX',
      baseCurrencyKey: 'sICX',
      quoteCurrencyKey: 'ICX',
      rewards: 0.03,
      baseToken: sICX,
      quoteToken: ICX,
    },
    {
      chainId: 1,
      id: 2,
      name: 'sICX/bnUSD',
      baseCurrencyKey: 'sICX',
      quoteCurrencyKey: 'bnUSD',
      baseToken: sICX,
      quoteToken: bnUSD,
      rewards: 0.12,
    },
    {
      chainId: 1,
      id: 3,
      name: 'BALN/bnUSD',
      baseCurrencyKey: 'BALN',
      quoteCurrencyKey: 'bnUSD',
      baseToken: BALN,
      quoteToken: bnUSD,
      rewards: 0.12,
    },
    {
      chainId: 1,
      id: 4,
      name: 'BALN/sICX',
      baseCurrencyKey: 'BALN',
      quoteCurrencyKey: 'sICX',
      baseToken: BALN,
      quoteToken: sICX,
      rewards: 0.15,
    },
    {
      chainId: 1,
      id: 5,
      name: 'IUSDC/bnUSD',
      baseCurrencyKey: 'IUSDC',
      quoteCurrencyKey: 'bnUSD',
      baseToken: IUSDC,
      quoteToken: bnUSD,
      rewards: 0.025,
    },
    {
      chainId: 1,
      id: 15,
      name: 'IUSDT/bnUSD',
      baseCurrencyKey: 'IUSDT',
      quoteCurrencyKey: 'bnUSD',
      baseToken: IUSDT,
      quoteToken: bnUSD,
      rewards: 0.005,
    },
    {
      chainId: 1,
      id: 10,
      name: 'USDS/bnUSD',
      baseCurrencyKey: 'USDS',
      quoteCurrencyKey: 'bnUSD',
      baseToken: USDS,
      quoteToken: bnUSD,
      rewards: 0.02,
    },
    {
      chainId: 1,
      id: 7,
      name: 'OMM/sICX',
      baseCurrencyKey: 'OMM',
      quoteCurrencyKey: 'sICX',
      baseToken: OMM,
      quoteToken: sICX,
    },
    {
      chainId: 1,
      id: 6,
      name: 'OMM/IUSDC',
      baseCurrencyKey: 'OMM',
      quoteCurrencyKey: 'IUSDC',
      baseToken: OMM,
      quoteToken: IUSDC,
    },
    {
      chainId: 1,
      id: 8,
      name: 'OMM/USDS',
      baseCurrencyKey: 'OMM',
      quoteCurrencyKey: 'USDS',
      baseToken: OMM,
      quoteToken: USDS,
    },
    {
      chainId: 1,
      id: 9,
      name: 'CFT/sICX',
      baseCurrencyKey: 'CFT',
      quoteCurrencyKey: 'sICX',
      baseToken: CFT,
      quoteToken: sICX,
    },
    {
      chainId: 1,
      id: 11,
      name: 'METX/bnUSD',
      baseCurrencyKey: 'METX',
      quoteCurrencyKey: 'bnUSD',
      baseToken: METX,
      quoteToken: bnUSD,
    },
    {
      chainId: 1,
      id: 12,
      name: 'METX/sICX',
      baseCurrencyKey: 'METX',
      quoteCurrencyKey: 'sICX',
      baseToken: METX,
      quoteToken: sICX,
    },
    {
      chainId: 1,
      id: 13,
      name: 'METX/IUSDC',
      baseCurrencyKey: 'METX',
      quoteCurrencyKey: 'IUSDC',
      baseToken: METX,
      quoteToken: IUSDC,
    },
    {
      chainId: 1,
      id: 14,
      name: 'METX/USDS',
      baseCurrencyKey: 'METX',
      quoteCurrencyKey: 'USDS',
      baseToken: METX,
      quoteToken: USDS,
    },
    {
      chainId: 1,
      id: 17,
      name: 'GBET/bnUSD',
      baseCurrencyKey: 'GBET',
      quoteCurrencyKey: 'bnUSD',
      baseToken: GBET,
      quoteToken: bnUSD,
    },
  ],
  [NetworkId.YEOUIDO]: [
    {
      chainId: 3,
      id: 1,
      name: 'sICX/ICX',
      baseCurrencyKey: 'sICX',
      quoteCurrencyKey: 'ICX',
      rewards: 0.1,
      baseToken: sICX_YEOUIDO,
      quoteToken: ICX_YEOUIDO,
    },
    {
      chainId: 3,
      id: 2,
      name: 'sICX/bnUSD',
      baseCurrencyKey: 'sICX',
      quoteCurrencyKey: 'bnUSD',
      baseToken: sICX_YEOUIDO,
      quoteToken: bnUSD_YEOUIDO,
      rewards: 0.175,
    },
    {
      chainId: 3,
      id: 3,
      name: 'BALN/bnUSD',
      baseCurrencyKey: 'BALN',
      quoteCurrencyKey: 'bnUSD',
      baseToken: BALN_YEOUIDO,
      quoteToken: bnUSD_YEOUIDO,
      rewards: 0.175,
    },
    {
      chainId: 3,
      id: 4,
      name: 'BALN/sICX',
      baseCurrencyKey: 'BALN',
      quoteCurrencyKey: 'sICX',
      baseToken: BALN_YEOUIDO,
      quoteToken: sICX_YEOUIDO,
      rewards: 0.05,
    },
    {
      chainId: 3,
      id: 24,
      name: 'OMM/IUSDC',
      baseCurrencyKey: 'OMM',
      quoteCurrencyKey: 'IUSDC',
      baseToken: OMM_YEOUIDO,
      quoteToken: IUSDC_YEOUIDO,
    },
    {
      chainId: 3,
      id: 25,
      name: 'OMM/sICX',
      baseCurrencyKey: 'OMM',
      quoteCurrencyKey: 'sICX',
      baseToken: OMM_YEOUIDO,
      quoteToken: sICX_YEOUIDO,
    },
    {
      chainId: 3,
      id: 23,
      name: 'OMM/USDS',
      baseCurrencyKey: 'OMM',
      quoteCurrencyKey: 'USDS',
      baseToken: OMM_YEOUIDO,
      quoteToken: USDS_YEOUIDO,
    },
    {
      chainId: 3,
      id: 30,
      name: 'CFT/sICX',
      baseCurrencyKey: 'CFT',
      quoteCurrencyKey: 'sICX',
      baseToken: CFT_YEOUIDO,
      quoteToken: sICX_YEOUIDO,
    },
  ],
  [NetworkId.SEJONG]: [
    {
      chainId: 83,
      id: 1,
      name: 'sICX/ICX',
      baseCurrencyKey: 'sICX',
      quoteCurrencyKey: 'ICX',
      baseToken: sICX_SEJONG,
      quoteToken: ICX_SEJONG,
      rewards: 0.1,
    },
    {
      chainId: 83,
      id: 2,
      name: 'sICX/bnUSD',
      baseCurrencyKey: 'sICX',
      quoteCurrencyKey: 'bnUSD',
      baseToken: sICX_SEJONG,
      quoteToken: bnUSD_SEJONG,
      rewards: 0.15,
    },
    {
      chainId: 83,
      id: 3,
      name: 'BALN/bnUSD',
      baseCurrencyKey: 'BALN',
      quoteCurrencyKey: 'bnUSD',
      baseToken: BALN_SEJONG,
      quoteToken: bnUSD_SEJONG,
      rewards: 0.15,
    },
    {
      chainId: 83,
      id: 4,
      name: 'BALN/sICX',
      baseCurrencyKey: 'BALN',
      quoteCurrencyKey: 'sICX',
      baseToken: BALN_SEJONG,
      quoteToken: sICX_SEJONG,
      rewards: 0.1,
    },
  ],
};

export const SUPPORTED_PAIRS = SUPPORTED_PAIRS_INFO[NETWORK_ID];
