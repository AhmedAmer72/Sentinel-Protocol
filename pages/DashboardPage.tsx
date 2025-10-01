
import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/animations/PageWrapper';
import { useWallet } from '../components/providers/WalletProvider';
import { fetchDashboardData } from '../services/massaService';
import { UserPosition } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import HealthFactorIndicator from '../components/ui/HealthFactorIndicator';
import { formatCurrency, formatNumber } from '../lib/utils';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const DashboardPage: React.FC = () => {
  const { isConnected } = useWallet();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ positions: UserPosition[], totalCollateral: number, totalDebt: number } | null>(null);

  useEffect(() => {
    if (isConnected) {
      setLoading(true);
      fetchDashboardData().then(res => {
        setData(res);
        setLoading(false);
      });
    }
  }, [isConnected]);

  if (!isConnected) {
    return (
      <PageWrapper key="dashboard-disconnected">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Please connect your wallet</h2>
          <p className="text-gray-400 mt-2">Connect your wallet to view your dashboard.</p>
        </div>
      </PageWrapper>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner className="w-8 h-8" />
      </div>
    );
  }

  const chartData = data?.positions.map(p => ({
    name: p.collateral.asset.symbol,
    value: p.collateral.amount * p.collateral.asset.price
  })) || [];
  const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#22D3EE'];

  return (
    <PageWrapper key="dashboard">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Total Collateral</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-green-400">{formatCurrency(data?.totalCollateral || 0)}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Total Debt</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-red-400">{formatCurrency(data?.totalDebt || 0)}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Collateral Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-48">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8">
                                {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        {/* Positions Table */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Your Positions</h2>
          <div className="flex flex-col gap-4">
            {data?.positions.map(pos => (
              <Card key={pos.id} className="grid grid-cols-1 md:grid-cols-3 items-center p-4 gap-4">
                <div>
                    <div className="font-semibold text-white">Collateral</div>
                    <div className="flex items-center gap-2 mt-1">
                        {pos.collateral.asset.logo}
                        <div>
                            <div>{formatNumber(pos.collateral.amount)} {pos.collateral.asset.symbol}</div>
                            <div className="text-xs text-gray-400">{formatCurrency(pos.collateral.amount * pos.collateral.asset.price)}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="font-semibold text-white">Debt</div>
                    <div className="flex items-center gap-2 mt-1">
                        {pos.debt.asset.logo}
                         <div>
                            <div>{formatNumber(pos.debt.amount)} {pos.debt.asset.symbol}</div>
                            <div className="text-xs text-gray-400">{formatCurrency(pos.debt.amount * pos.debt.asset.price)}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <HealthFactorIndicator healthFactor={pos.healthFactor} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DashboardPage;
