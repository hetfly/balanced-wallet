import React from 'react';

import BigNumber from 'bignumber.js';
import Nouislider from 'nouislider-react';
import { BalancedJs } from 'packages/BalancedJs';
import { useIconReact } from 'packages/icon-react';
import { Flex, Box } from 'rebass/styled-components';

import { Button } from 'app/components/Button';
import CurrencyInputPanel from 'app/components/CurrencyInputPanel';
import DropdownText from 'app/components/DropdownText';
import { BoxPanel } from 'app/components/Panel';
import { Typography } from 'app/theme';
import bnJs from 'bnJs';
import { CURRENCYLIST } from 'constants/currency';
import { useLiquiditySupply, useChangeLiquiditySupply } from 'store/liquidity/hooks';
import { useRatioValue } from 'store/ratio/hooks';
import { useReward } from 'store/reward/hooks';
import { useTransactionAdder } from 'store/transactions/hooks';
import { useWalletBalanceValue } from 'store/wallet/hooks';
import { formatBigNumber } from 'utils';

import { withdrawMessage } from './utils';

const LiquidityDetails = () => {
  const { account } = useIconReact();

  const changeLiquiditySupply = useChangeLiquiditySupply();
  const liquiditySupply = useLiquiditySupply();
  const addTransaction = useTransactionAdder();
  const walletBalance = useWalletBalanceValue();
  const ratio = useRatioValue();
  const poolReward = useReward();

  const sICXbnUSDTotalSupply = liquiditySupply.sICXbnUSDTotalSupply || new BigNumber(0);
  const sICXbnUSDSuppliedShare =
    liquiditySupply.sICXbnUSDBalance?.dividedBy(sICXbnUSDTotalSupply)?.multipliedBy(100) || new BigNumber(0);

  const BALNbnUSDTotalSupply = liquiditySupply.BALNbnUSDTotalSupply || new BigNumber(0);
  const BALNbnUSDSuppliedShare =
    liquiditySupply.BALNbnUSDBalance?.dividedBy(BALNbnUSDTotalSupply)?.multipliedBy(100) || new BigNumber(0);

  const sICXICXTotalSupply = liquiditySupply.sICXICXTotalSupply || new BigNumber(0);
  const ICXBalance = liquiditySupply.ICXBalance || new BigNumber(0);
  const sICXICXSuppliedShare = ICXBalance.dividedBy(sICXICXTotalSupply).multipliedBy(100);

  const [amountWithdrawICX, setAmountWithdrawICX] = React.useState('0');

  React.useEffect(() => {
    console.log('useEffect');
    setAmountWithdrawICX('0');
  }, [liquiditySupply.ICXBalance]);

  const [amountWithdrawsICXbnUSDMax, setAmountWithdrawsICXbnUSDMax] = React.useState(0);

  React.useEffect(() => {
    if (
      liquiditySupply.sICXSuppliedPoolsICXbnUSD
        ?.multipliedBy(ratio.sICXbnUSDratio)
        .isLessThan(liquiditySupply.bnUSDSuppliedPoolsICXbnUSD || new BigNumber(0))
    ) {
      setAmountWithdrawsICXbnUSDMax(liquiditySupply.sICXSuppliedPoolsICXbnUSD?.toNumber() || 0);
    } else {
      setAmountWithdrawsICXbnUSDMax(liquiditySupply.bnUSDSuppliedPoolsICXbnUSD?.toNumber() || 0);
    }
  }, [liquiditySupply.sICXSuppliedPoolsICXbnUSD, liquiditySupply.bnUSDSuppliedPoolsICXbnUSD, ratio.sICXbnUSDratio]);

  const [amountWithdrawBALNbnUSDMax, setAmountWithdrawBALNbnUSDMax] = React.useState(0);

  React.useEffect(() => {
    if (
      liquiditySupply.BALNSuppliedPoolBALNbnUSD?.multipliedBy(ratio.BALNbnUSDratio).isLessThan(
        liquiditySupply.bnUSDSuppliedPoolBALNbnUSD || new BigNumber(0),
      )
    ) {
      setAmountWithdrawBALNbnUSDMax(liquiditySupply.BALNSuppliedPoolBALNbnUSD?.toNumber() || 0);
    } else {
      setAmountWithdrawBALNbnUSDMax(liquiditySupply.bnUSDSuppliedPoolBALNbnUSD?.toNumber() || 0);
    }
  }, [liquiditySupply.BALNSuppliedPoolBALNbnUSD, liquiditySupply.bnUSDSuppliedPoolBALNbnUSD, ratio.BALNbnUSDratio]);

  const handleTypeAmountWithdrawICX = (val: string) => {
    setAmountWithdrawICX(val);
  };

  const sICXICXpoolDailyReward =
    (poolReward.sICXICXreward?.toNumber() || 0) * (poolReward.poolDailyReward?.toNumber() || 0);

  const sICXbnUSDpoolDailyReward = poolReward.sICXbnUSDreward?.multipliedBy(
    poolReward.poolDailyReward || new BigNumber(0),
  );

  const BALNbnUSDpoolDailyReward = poolReward.BALNbnUSDreward?.multipliedBy(
    poolReward.poolDailyReward || new BigNumber(0),
  );

  const handleWithdrawalICX = () => {
    if (!account) return;
    bnJs
      .eject({ account: account })
      .Dex.cancelSicxIcxOrder()
      .then(res => {
        console.log(res);
        changeLiquiditySupply({ ICXBalance: new BigNumber(0) });
        addTransaction(
          { hash: res.result },
          {
            pending: withdrawMessage(amountWithdrawICX, 'ICX', '', 'sICX').pendingMessage,
            summary: withdrawMessage(amountWithdrawICX, 'ICX', '', 'sICX').successMessage,
          },
        );
      })
      .catch(e => {
        console.error('error', e);
      });
  };

  /** withdraw sICXbnUSD **/

  const [amountWithdrawSICXPoolsICXbnUSD, setAmountWithdrawSICXPoolsICXbnUSD] = React.useState('0');
  const [amountWithdrawBNUSDPoolsICXbnUSD, setAmountWithdrawBNUSDPoolsICXbnUSD] = React.useState('0');

  const handleTypeAmountWithdrawsICXPoolsICXbnUSD = (val: string) => {
    setAmountWithdrawSICXPoolsICXbnUSD(val);
    let outputAmount = new BigNumber(val).multipliedBy(ratio.sICXbnUSDratio);
    if (outputAmount.isNaN()) outputAmount = new BigNumber(0);
    setAmountWithdrawBNUSDPoolsICXbnUSD(formatBigNumber(outputAmount, 'input'));
  };

  const handleTypeAmountWithdrawBNUSDPoolsICXbnUSD = (val: string) => {
    setAmountWithdrawBNUSDPoolsICXbnUSD(val);
    let inputAmount = new BigNumber(val).multipliedBy(new BigNumber(1).dividedBy(ratio.sICXbnUSDratio));
    if (inputAmount.isNaN()) inputAmount = new BigNumber(0);
    setAmountWithdrawSICXPoolsICXbnUSD(formatBigNumber(inputAmount, 'input'));
  };

  /** withdraw BALNbnUSD */

  const [amountWithdrawBALNPoolBALNbnUSD, setAmountWithdrawBALNPoolBALNbnUSD] = React.useState('0');
  const [amountWithdrawBNUSDPoolBALNbnUSD, setAmountWithdrawBNUSDPoolsBALNbnUSD] = React.useState('0');

  const handleTypeAmountWithdrawBALNPoolBALNbnUSD = (val: string) => {
    setAmountWithdrawBALNPoolBALNbnUSD(val);
    let outputAmount = new BigNumber(val).multipliedBy(ratio.BALNbnUSDratio);
    if (outputAmount.isNaN()) outputAmount = new BigNumber(0);
    setAmountWithdrawBNUSDPoolsBALNbnUSD(formatBigNumber(outputAmount, 'input'));
  };

  const handleTypeAmountWithdrawBNUSDPoolBALNbnUSD = (val: string) => {
    setAmountWithdrawBNUSDPoolsBALNbnUSD(val);
    let inputAmount = new BigNumber(val).multipliedBy(new BigNumber(1).dividedBy(ratio.BALNbnUSDratio));
    if (inputAmount.isNaN()) inputAmount = new BigNumber(0);
    setAmountWithdrawBALNPoolBALNbnUSD(formatBigNumber(inputAmount, 'input'));
  };

  const handleWithdrawalSICXBNUSD = () => {
    if (!account) return;
    // TODO: calculate value and withdrawal
    const withdrawTotal =
      parseFloat(amountWithdrawSICXPoolsICXbnUSD) *
      (1 /
        ((liquiditySupply.sICXPoolsICXbnUSDTotal?.toNumber() || 0) /
          (liquiditySupply.sICXbnUSDTotalSupply?.toNumber() || 0)));
    bnJs
      .eject({ account: account })
      .Dex.remove(BalancedJs.utils.sICXbnUSDpoolId, new BigNumber(withdrawTotal))
      .then(result => {
        console.log(result);
        addTransaction(
          { hash: result.result },
          {
            summary: `${amountWithdrawSICXPoolsICXbnUSD} sICX and ${amountWithdrawBNUSDPoolsICXbnUSD} bnUSD added to your wallet.`,
          },
        );
      })
      .catch(e => {
        console.error('error', e);
      });
  };

  const handleWithdrawalBALNbnUSD = () => {
    if (!account) return;
    // TODO: calculate value and withdrawal
    const withdrawTotal =
      parseFloat(amountWithdrawBNUSDPoolBALNbnUSD) *
      (1 /
        ((liquiditySupply.BALNPoolBALNbnUSDTotal?.toNumber() || 0) /
          (liquiditySupply.BALNbnUSDTotalSupply?.toNumber() || 0)));
    bnJs
      .eject({ account: account })
      .Dex.remove(BalancedJs.utils.BALNbnUSDpoolId, new BigNumber(withdrawTotal))
      .then(result => {
        console.log(result);
        addTransaction(
          { hash: result.result },
          {
            summary: `${amountWithdrawBALNPoolBALNbnUSD} BALN and ${amountWithdrawBNUSDPoolBALNbnUSD} bnUSD added to your wallet.`,
          },
        );
      })
      .catch(e => {
        console.error('error', e);
      });
  };

  if (
    !account ||
    (liquiditySupply.sICXSuppliedPoolsICXbnUSD?.toNumber() === 0 &&
      liquiditySupply.BALNSuppliedPoolBALNbnUSD?.toNumber() === 0 &&
      liquiditySupply.ICXBalance?.toNumber() === 0)
  ) {
    return null;
  }

  const handleSlideWithdrawalICX = (values: string[], handle: number) => {
    setAmountWithdrawICX(values[handle]);
  };

  const handleSlideWithdrawsICXPoolsICXbnUSD = (values: string[], handle: number) => {
    handleTypeAmountWithdrawsICXPoolsICXbnUSD(values[handle]);
  };

  const handleSlideWithdrawBALNPoolBALNbnUSD = (values: string[], handle: number) => {
    handleTypeAmountWithdrawBALNPoolBALNbnUSD(values[handle]);
  };

  return (
    <BoxPanel bg="bg2" mb={10}>
      <Typography variant="h2" mb={5}>
        Liquidity details
      </Typography>

      {/* <!-- Liquidity list --> */}
      <table className="list liquidity">
        <thead>
          <tr>
            <th>Pool</th>
            <th>Your supply</th>
            <th>Pool share</th>
            <th>Daily rewards</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {/* <!-- sICX / ICX --> */}
          <tr>
            <td>sICX / ICX</td>
            <td>{formatBigNumber(ICXBalance, 'currency')} ICX</td>
            <td>{sICXICXSuppliedShare?.isNaN() ? '0.00' : formatBigNumber(sICXICXSuppliedShare, 'currency')}%</td>
            <td>
              ~{' '}
              {formatBigNumber(
                new BigNumber(sICXICXpoolDailyReward * (ICXBalance.toNumber() / sICXICXTotalSupply.toNumber())),
                'currency',
              )}{' '}
              BALN
            </td>
            <td>
              <DropdownText text="Withdraw">
                <Flex padding={5} bg="bg4" maxWidth={320} flexDirection="column">
                  <Typography variant="h3" mb={3}>
                    Withdraw:&nbsp;
                    <Typography as="span">sICX / ICX</Typography>
                  </Typography>
                  <Box mb={3}>
                    <CurrencyInputPanel
                      value={amountWithdrawICX}
                      showMaxButton={false}
                      currency={CURRENCYLIST['icx']}
                      onUserInput={handleTypeAmountWithdrawICX}
                      id="withdraw-liquidity-input"
                      bg="bg5"
                    />
                  </Box>
                  <Typography mb={5} textAlign="right">
                    Wallet: {formatBigNumber(walletBalance.ICXbalance, 'currency')} ICX
                  </Typography>
                  <Nouislider
                    id="slider-supply"
                    start={[0]}
                    padding={[0]}
                    connect={[true, false]}
                    range={{
                      min: [0],
                      max: [ICXBalance.toNumber()],
                    }}
                    onSlide={handleSlideWithdrawalICX}
                  />
                  <Flex alignItems="center" justifyContent="center">
                    <Button mt={5} onClick={handleWithdrawalICX}>
                      Withdraw liquidity
                    </Button>
                  </Flex>
                </Flex>
              </DropdownText>
            </td>
          </tr>

          <tr>
            <td>sICX / bnUSD</td>
            <td>
              {formatBigNumber(liquiditySupply.sICXSuppliedPoolsICXbnUSD, 'currency') + ' sICX'}
              <br />
              {formatBigNumber(liquiditySupply.bnUSDSuppliedPoolsICXbnUSD, 'currency') + ' bnUSD'}
            </td>
            <td>
              {!account
                ? '-'
                : sICXbnUSDSuppliedShare?.isNaN()
                ? '0.00'
                : formatBigNumber(sICXbnUSDSuppliedShare, 'currency')}
              %
            </td>
            <td>
              ~{' '}
              {formatBigNumber(
                sICXbnUSDpoolDailyReward?.multipliedBy(sICXbnUSDSuppliedShare?.dividedBy(100)),
                'currency',
              )}{' '}
              BALN
            </td>
            <td>
              <DropdownText text="Withdraw">
                <Flex padding={5} bg="bg4" maxWidth={320} flexDirection="column">
                  <Typography variant="h3" mb={3}>
                    Withdraw:&nbsp;
                    <Typography as="span">sICX / bnUSD</Typography>
                  </Typography>
                  <Box mb={3}>
                    <CurrencyInputPanel
                      value={amountWithdrawSICXPoolsICXbnUSD}
                      showMaxButton={false}
                      currency={CURRENCYLIST['sicx']}
                      onUserInput={handleTypeAmountWithdrawsICXPoolsICXbnUSD}
                      id="withdraw-liquidity-input"
                      bg="bg5"
                    />
                  </Box>
                  <Box mb={3}>
                    <CurrencyInputPanel
                      value={amountWithdrawBNUSDPoolsICXbnUSD}
                      showMaxButton={false}
                      currency={CURRENCYLIST['bnusd']}
                      onUserInput={handleTypeAmountWithdrawBNUSDPoolsICXbnUSD}
                      id="withdraw-liquidity-input"
                      bg="bg5"
                    />
                  </Box>
                  <Typography mb={5} textAlign="right">
                    Wallet: {formatBigNumber(walletBalance.sICXbalance, 'currency')} sICX /{' '}
                    {formatBigNumber(walletBalance.bnUSDbalance, 'currency')} bnUSD
                  </Typography>
                  <Nouislider
                    id="slider-supply"
                    start={[0]}
                    padding={[0]}
                    connect={[true, false]}
                    range={{
                      min: [0],
                      max: [amountWithdrawsICXbnUSDMax],
                    }}
                    onSlide={handleSlideWithdrawsICXPoolsICXbnUSD}
                  />
                  <Flex alignItems="center" justifyContent="center">
                    <Button mt={5} onClick={handleWithdrawalSICXBNUSD}>
                      Withdraw liquidity
                    </Button>
                  </Flex>
                </Flex>
              </DropdownText>
            </td>
          </tr>

          {/* <!-- BALN / bnUSD --> */}
          <tr>
            <td>BALN / bnUSD</td>
            <td>
              {formatBigNumber(liquiditySupply.BALNSuppliedPoolBALNbnUSD, 'currency')} BALN
              <br />
              {formatBigNumber(liquiditySupply.bnUSDSuppliedPoolBALNbnUSD, 'currency')} bnUSD
            </td>
            <td>{!account ? '-' : formatBigNumber(BALNbnUSDSuppliedShare, 'currency')}%</td>
            <td>
              ~{' '}
              {formatBigNumber(
                BALNbnUSDpoolDailyReward?.multipliedBy(BALNbnUSDSuppliedShare.dividedBy(100)),
                'currency',
              )}{' '}
              BALN
            </td>
            <td>
              <DropdownText text="Withdraw">
                <Flex padding={5} bg="bg4" maxWidth={320} flexDirection="column">
                  <Typography variant="h3" mb={3}>
                    Withdraw:&nbsp;
                    <Typography as="span">BALN / bnUSD</Typography>
                  </Typography>
                  <Box mb={3}>
                    <CurrencyInputPanel
                      value={amountWithdrawBALNPoolBALNbnUSD}
                      showMaxButton={false}
                      currency={CURRENCYLIST['baln']}
                      onUserInput={handleTypeAmountWithdrawBALNPoolBALNbnUSD}
                      id="withdraw-liquidity-input"
                      bg="bg5"
                    />
                  </Box>
                  <Box mb={3}>
                    <CurrencyInputPanel
                      value={amountWithdrawBNUSDPoolBALNbnUSD}
                      showMaxButton={false}
                      currency={CURRENCYLIST['bnusd']}
                      onUserInput={handleTypeAmountWithdrawBNUSDPoolBALNbnUSD}
                      id="withdraw-liquidity-input"
                      bg="bg5"
                    />
                  </Box>
                  <Typography mb={5} textAlign="right">
                    Wallet: {formatBigNumber(walletBalance.BALNbalance, 'currency')} BALN /{' '}
                    {formatBigNumber(walletBalance.bnUSDbalance, 'currency')} bnUSD
                  </Typography>
                  <Nouislider
                    id="slider-supply"
                    start={[0]}
                    padding={[0]}
                    connect={[true, false]}
                    range={{
                      min: [0],
                      max: [amountWithdrawBALNbnUSDMax],
                    }}
                    onSlide={handleSlideWithdrawBALNPoolBALNbnUSD}
                  />
                  <Flex alignItems="center" justifyContent="center">
                    <Button mt={5} onClick={handleWithdrawalBALNbnUSD}>
                      Withdraw liquidity
                    </Button>
                  </Flex>
                </Flex>
              </DropdownText>
            </td>
          </tr>
        </tbody>
      </table>
    </BoxPanel>
  );
};

export default LiquidityDetails;
