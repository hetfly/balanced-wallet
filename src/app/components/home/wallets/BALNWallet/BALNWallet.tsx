import React from 'react';

import { Tabs, TabPanels, TabPanel } from '@reach/tabs';

import Divider from 'app/components/Divider';
import { BoxPanel } from 'app/components/Panel';

import SendPanel from '../SendPanel';
import { StyledTabList, StyledTab } from '../utils';
import StakePanel from './StakePanel';
import UnstakePanel from './UnstakePanel';

export default function BALNWallet() {
  return (
    <BoxPanel bg="bg3">
      <Tabs>
        <StyledTabList>
          <StyledTab>Stake</StyledTab>
          <StyledTab>Send</StyledTab>
          <StyledTab>Unstaking</StyledTab>
        </StyledTabList>
        <Divider mb={3} />
        <TabPanels>
          <TabPanel>
            <StakePanel />
          </TabPanel>

          <TabPanel>
            <SendPanel currencyKey="BALN" />
          </TabPanel>

          <TabPanel>
            <UnstakePanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </BoxPanel>
  );
}
