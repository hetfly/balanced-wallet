import { createReducer } from '@reduxjs/toolkit';

import { SUPPORTED_TOKENS_LIST } from 'constants/tokens';
import { Currency } from 'types/balanced-sdk-core';

import {
  Field,
  replaceSwapState,
  selectCurrency,
  selectPercent,
  setRecipient,
  switchCurrencies,
  typeInput,
} from './actions';

export interface SwapState {
  readonly independentField: Field;
  readonly typedValue: string;
  readonly [Field.INPUT]: {
    readonly currency: Currency | undefined;
    readonly percent: number;
  };
  readonly [Field.OUTPUT]: {
    readonly currency: Currency | undefined;
  };
  // the typed recipient address or ENS name, or null if swap should go to sender
  readonly recipient: string | null;
}

const initialState: SwapState = {
  independentField: Field.INPUT,
  typedValue: '',
  [Field.INPUT]: {
    currency: SUPPORTED_TOKENS_LIST[3],
    percent: 0,
  },
  [Field.OUTPUT]: {
    currency: SUPPORTED_TOKENS_LIST[2],
  },
  recipient: null,
};

export default createReducer<SwapState>(initialState, builder =>
  builder
    .addCase(
      replaceSwapState,
      (state, { payload: { typedValue, recipient, field, inputCurrency, outputCurrency } }) => {
        return {
          [Field.INPUT]: {
            currency: inputCurrency,
            percent: 0,
          },
          [Field.OUTPUT]: {
            currency: outputCurrency,
          },
          independentField: field,
          typedValue: typedValue,
          recipient,
        };
      },
    )
    .addCase(selectCurrency, (state, { payload: { currency, field } }) => {
      const otherField = field === Field.INPUT ? Field.OUTPUT : Field.INPUT;

      if (currency === state[otherField].currency) {
        // the case where we have to swap the order
        return {
          ...state,
          independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT,
          [field]: { ...state[field], currency: currency, percent: 0 },
          [otherField]: { ...state[otherField], currency: state[field].currency, percent: 0 },
        };
      } else {
        // the normal case
        return {
          ...state,
          [field]: { ...state[field], currency: currency, percent: 0 },
        };
      }
    })
    .addCase(selectPercent, (state, { payload: { percent, field, value } }) => {
      return {
        ...state,
        independentField: field,
        typedValue: value,
        [field]: { ...state[field], percent: percent },
      };
    })
    .addCase(switchCurrencies, state => {
      return {
        ...state,
        independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT,
        [Field.INPUT]: { ...state[Field.OUTPUT], currency: state[Field.OUTPUT].currency, percent: 0 },
        [Field.OUTPUT]: { ...state[Field.INPUT], currency: state[Field.INPUT].currency },
      };
    })
    .addCase(typeInput, (state, { payload: { field, typedValue } }) => {
      const otherField = field === Field.INPUT ? Field.OUTPUT : Field.INPUT;

      return {
        ...state,
        independentField: field,
        typedValue,
        [field]: { ...state[field], percent: 0 },
        [otherField]: { ...state[otherField], percent: 0 },
      };
    })
    .addCase(setRecipient, (state, { payload: { recipient } }) => {
      state.recipient = recipient;
    }),
);
