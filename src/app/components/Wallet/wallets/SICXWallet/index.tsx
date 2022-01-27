import React from 'react';

import { Tabs, TabPanels, TabPanel } from '@reach/tabs';

import Divider from 'app/components/Divider';
import { Currency } from 'types/balanced-sdk-core';

import SendPanel from '../SendPanel';
import { StyledTabList, StyledTab } from '../utils';
import DepositPanel from './DepositPanel';
import UnstakePanel from './UnstakePanel';

export default function SICXWallet({ currency }: { currency: Currency }) {
  return (
    <>
      <Tabs>
        <StyledTabList>
          <StyledTab>Send</StyledTab>
          <StyledTab>Deposit</StyledTab>
          <StyledTab>Unstake</StyledTab>
        </StyledTabList>
        <Divider mb={3} />
        <TabPanels>
          <TabPanel>
            <SendPanel currency={currency} />
          </TabPanel>

          <TabPanel>
            <DepositPanel />
          </TabPanel>
          <TabPanel>
            <UnstakePanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
