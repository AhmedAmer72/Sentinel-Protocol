// Fix: Add React import for React.ReactNode type.
import React from 'react';

export interface Asset {
  symbol: string;
  name: string;
  logo: React.ReactNode;
  price: number;
}

export enum HealthFactorStatus {
  HEALTHY = 'Healthy',
  RISKY = 'Risky',
  UNHEALTHY = 'Unhealthy',
}

export interface UserPosition {
  id: string;
  collateral: {
    asset: Asset;
    amount: number;
  };
  debt: {
    asset: Asset;
    amount: number;
  };
  healthFactor: number;
}

export interface Market {
  asset: Asset;
  tvl: number;
  apy: number;
  ltv: number;
  liquidationThreshold: number;
  liquidationBonus: number;
}