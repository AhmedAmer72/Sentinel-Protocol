
import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/animations/PageWrapper';
import { fetchMarkets } from '../services/massaService';
import { Market } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { formatCurrency, formatNumber } from '../lib/utils';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const MarketsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [markets, setMarkets] = useState<Market[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchMarkets().then(res => {
      setMarkets(res);
      setLoading(false);
    });
  }, []);

  return (
    <PageWrapper key="markets">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-white">Markets</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner className="w-8 h-8" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {markets.map(market => (
              <Card key={market.asset.symbol}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    {market.asset.logo}
                    <CardTitle>{market.asset.name}</CardTitle>
                  </div>
                   <div className="text-lg font-mono text-white">{formatCurrency(market.asset.price)}</div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Total Value Locked</span>
                        <span className="font-semibold text-white">{formatCurrency(market.tvl)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Supply APY</span>
                        <span className="font-semibold text-green-400">{market.apy.toFixed(2)}%</span>
                    </div>
                    <hr className="border-white/10" />
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Max LTV</span>
                        <span className="font-semibold text-white">{(market.ltv * 100).toFixed(0)}%</span>
                    </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Liquidation Threshold</span>
                        <span className="font-semibold text-white">{(market.liquidationThreshold * 100).toFixed(0)}%</span>
                    </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Liquidation Bonus</span>
                        <span className="font-semibold text-white">{(market.liquidationBonus * 100).toFixed(1)}%</span>
                    </div>
                    <div className="pt-4">
                        <Button className="w-full" onClick={() => navigate('/borrow')}>Borrow / Lend</Button>
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default MarketsPage;
