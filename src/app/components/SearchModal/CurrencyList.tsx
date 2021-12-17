import React, { CSSProperties } from 'react';

import { useIconReact } from 'packages/icon-react';
import { MinusCircle } from 'react-feather';
import { Flex } from 'rebass/styled-components';

import CurrencyLogo from 'app/components/CurrencyLogo';
import { ListItem, DashGrid, HeaderText, DataText, List1 } from 'app/components/List';
import { useIsUserAddedToken } from 'store/user/hooks';
import { useCurrencyBalance } from 'store/wallet/hooks';
import { Currency, Token } from 'types/balanced-sdk-core';

function currencyKey(currency: Currency): string {
  return currency.isToken ? currency.address : 'ICX';
}

function CurrencyRow({
  currency,
  onSelect,
  isSelected,
  otherSelected,
  style,
  showCurrencyAmount,
  onRemove,
}: {
  currency: Currency;
  onSelect: () => void;
  isSelected?: boolean;
  otherSelected?: boolean;
  style?: CSSProperties;
  showCurrencyAmount?: boolean;
  onRemove: () => void;
}) {
  const { account } = useIconReact();
  const balance = useCurrencyBalance(account ?? undefined, currency);
  const isUserAddedToken = useIsUserAddedToken(currency as Token);
  // only show add or remove buttons if not on selected list
  return (
    <ListItem onClick={onSelect}>
      <Flex>
        <CurrencyLogo currency={currency} style={{ marginRight: '8px' }} />
        <DataText variant="p" fontWeight="bold">
          {currency?.symbol}
        </DataText>
      </Flex>
      <Flex justifyContent="flex-end">
        <DataText variant="p" textAlign="right">
          {balance?.toSignificant(4)}
        </DataText>
        {isUserAddedToken && (
          <MinusCircle
            onClick={e => {
              e.stopPropagation();
              onRemove();
            }}
          />
        )}
      </Flex>
    </ListItem>
  );
}

export default function CurrencyList({
  currencies,
  selectedCurrency,
  onCurrencySelect,
  otherCurrency,
  showImportView,
  setImportToken,
  showRemoveView,
  setRemoveToken,
  showCurrencyAmount,
}: {
  currencies: Currency[];
  selectedCurrency?: Currency | null;
  onCurrencySelect: (currency: Currency) => void;
  otherCurrency?: Currency | null;
  showImportView: () => void;
  setImportToken: (token: Token) => void;
  showRemoveView: () => void;
  setRemoveToken: (token: Token) => void;
  showCurrencyAmount?: boolean;
}) {
  return (
    <List1 mt={4}>
      <DashGrid>
        <HeaderText>Asset</HeaderText>
        <HeaderText textAlign="right">Balance</HeaderText>
      </DashGrid>

      {currencies.map(currency => (
        <CurrencyRow
          key={currencyKey(currency)}
          currency={currency}
          onSelect={() => onCurrencySelect(currency)}
          onRemove={() => {
            setRemoveToken(currency as Token);
            showRemoveView();
          }}
        />
      ))}
    </List1>
  );
}
