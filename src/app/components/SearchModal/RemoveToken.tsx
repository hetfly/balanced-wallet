import React from 'react';

import { useIconReact } from 'packages/icon-react';
import { Flex } from 'rebass/styled-components';

import { AlertButton, TextButton } from 'app/components/Button';
import { AutoColumn } from 'app/components/Column';
import { Typography } from 'app/theme';
import { useRemoveUserAddedToken } from 'store/user/hooks';
import { Token } from 'types/balanced-sdk-core';

import TokenImportCard from './TokenImportCard';

interface RemoveProps {
  tokens: Token[];
  onBack?: () => void;
  onDismiss?: () => void;
}

export function RemoveToken(props: RemoveProps) {
  const { tokens, onDismiss } = props;

  const { networkId } = useIconReact();
  const removeToken = useRemoveUserAddedToken();

  return (
    <Flex flexDirection="column" alignItems="stretch" m={5} width="100%">
      <Typography textAlign="center" mb="5px" as="h3" fontWeight="normal">
        Remove asset?
      </Typography>

      <AutoColumn gap="md" style={{ padding: '1rem' }}>
        {tokens.map(token => (
          <TokenImportCard token={token} key={'import' + token.address} />
        ))}

        <Flex justifyContent="center" pt={3} className="border-top">
          <TextButton onClick={onDismiss}>Cancel</TextButton>
          <AlertButton
            color="alert"
            onClick={() => {
              tokens.map(token => removeToken(networkId, token.address));
              onDismiss && onDismiss();
            }}
          >
            Remove
          </AlertButton>
        </Flex>
      </AutoColumn>
    </Flex>
  );
}
