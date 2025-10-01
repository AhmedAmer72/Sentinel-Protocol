
import { Asset, UserPosition, Market, HealthFactorStatus } from '../types';
import { MASLogo, ETHLogo, USDCLogo } from '../components/icons/Icons';
import React from 'react';

// --- MOCK DATA ---

const MOCK_ASSETS: { [key: string]: Asset } = {
  MAS: { symbol: 'MAS', name: 'Massa', logo: React.createElement(MASLogo, {className: "h-6 w-6 text-blue-400"}), price: 3.50 },
  WETH: { symbol: 'wETH', name: 'Wrapped Ether', logo: React.createElement(ETHLogo, {className: "h-6 w-6 text-gray-400"}), price: 3000.00 },
  USDC: { symbol: 'USDC', name: 'USD Coin', logo: React.createElement(USDCLogo, {className: "h-6 w-6 text-blue-500"}), price: 1.00 },
};

const MOCK_MARKETS: Market[] = [
  {
    asset: MOCK_ASSETS.MAS,
    tvl: 15_000_000,
    apy: 3.5,
    ltv: 0.75,
    liquidationThreshold: 0.80,
    liquidationBonus: 0.05,
  },
  {
    asset: MOCK_ASSETS.WETH,
    tvl: 50_000_000,
    apy: 2.1,
    ltv: 0.80,
    liquidationThreshold: 0.85,
    liquidationBonus: 0.04,
  },
  {
    asset: MOCK_ASSETS.USDC,
    tvl: 120_000_000,
    apy: 4.2,
    ltv: 0.85,
    liquidationThreshold: 0.90,
    liquidationBonus: 0.02,
  },
];

const MOCK_USER_POSITIONS: UserPosition[] = [
  {
    id: 'pos-1',
    collateral: { asset: MOCK_ASSETS.WETH, amount: 2.5 },
    debt: { asset: MOCK_ASSETS.USDC, amount: 5000 },
    healthFactor: 1.83,
  },
  {
    id: 'pos-2',
    collateral: { asset: MOCK_ASSETS.MAS, amount: 10000 },
    debt: { asset: MOCK_ASSETS.USDC, amount: 25000 },
    healthFactor: 1.21,
  },
  {
    id: 'pos-3',
    collateral: { asset: MOCK_ASSETS.USDC, amount: 15000 },
    debt: { asset: MOCK_ASSETS.WETH, amount: 3.0 },
    healthFactor: 1.35,
  },
];


// --- MOCK API FUNCTIONS ---

const simulateNetworkDelay = <T,>(data: T): Promise<T> => {
  return new Promise(resolve => setTimeout(() => resolve(data), 500 + Math.random() * 500));
};

export const fetchMarkets = (): Promise<Market[]> => {
  return simulateNetworkDelay(MOCK_MARKETS);
};

export const fetchDashboardData = (): Promise<{ positions: UserPosition[], totalCollateral: number, totalDebt: number }> => {
  const totalCollateral = MOCK_USER_POSITIONS.reduce((sum, pos) => sum + pos.collateral.amount * pos.collateral.asset.price, 0);
  const totalDebt = MOCK_USER_POSITIONS.reduce((sum, pos) => sum + pos.debt.amount * pos.debt.asset.price, 0);
  return simulateNetworkDelay({
    positions: MOCK_USER_POSITIONS,
    totalCollateral,
    totalDebt,
  });
};

export const calculateHealthFactor = (
    collateralAmount: number, 
    collateralPrice: number, 
    collateralThreshold: number,
    debtAmount: number,
    debtPrice: number
): number => {
    const collateralValue = collateralAmount * collateralPrice;
    const debtValue = debtAmount * debtPrice;
    if (debtValue === 0) return Infinity;
    return (collateralValue * collateralThreshold) / debtValue;
}
