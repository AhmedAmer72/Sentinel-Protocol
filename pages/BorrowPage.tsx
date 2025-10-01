
import React, { useState, useEffect, useMemo } from 'react';
import PageWrapper from '../components/animations/PageWrapper';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import HealthFactorIndicator from '../components/ui/HealthFactorIndicator';
import { fetchMarkets } from '../services/massaService';
import { Market } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { calculateHealthFactor } from '../services/massaService';
import { useWallet } from '../components/providers/WalletProvider';

const BorrowPage: React.FC = () => {
    const { isConnected } = useWallet();
    const [markets, setMarkets] = useState<Market[]>([]);
    const [loading, setLoading] = useState(true);

    const [collateralAsset, setCollateralAsset] = useState<Market | null>(null);
    const [debtAsset, setDebtAsset] = useState<Market | null>(null);
    const [collateralAmount, setCollateralAmount] = useState('');
    const [debtAmount, setDebtAmount] = useState('');

    useEffect(() => {
        fetchMarkets().then(data => {
            setMarkets(data);
            if (data.length > 1) {
                setCollateralAsset(data[0]);
                setDebtAsset(data[1]);
            }
            setLoading(false);
        });
    }, []);

    const healthFactor = useMemo(() => {
        if (!collateralAsset || !debtAsset || !collateralAmount || !debtAmount) {
            return Infinity;
        }
        return calculateHealthFactor(
            parseFloat(collateralAmount),
            collateralAsset.asset.price,
            collateralAsset.liquidationThreshold,
            parseFloat(debtAmount),
            debtAsset.asset.price
        );
    }, [collateralAsset, debtAsset, collateralAmount, debtAmount]);

    if (!isConnected) {
        return (
          <PageWrapper key="borrow-disconnected">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold">Please connect your wallet</h2>
              <p className="text-gray-400 mt-2">Connect your wallet to borrow assets.</p>
            </div>
          </PageWrapper>
        );
    }
    
    if (loading) {
        return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>;
    }

    return (
        <PageWrapper key="borrow">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8 text-center">Open a new position</h1>
                <Card>
                    <CardContent className="p-8 space-y-6">
                        {/* Collateral Input */}
                        <div>
                            <label className="text-sm font-medium text-gray-300">Collateral</label>
                            <div className="mt-2 flex gap-2">
                                <select 
                                    className="bg-black/40 border border-white/20 rounded-md p-3 w-1/3"
                                    value={collateralAsset?.asset.symbol}
                                    onChange={e => setCollateralAsset(markets.find(m => m.asset.symbol === e.target.value) || null)}
                                >
                                    {markets.map(m => <option key={m.asset.symbol} value={m.asset.symbol}>{m.asset.symbol}</option>)}
                                </select>
                                <input
                                    type="number"
                                    placeholder="0.0"
                                    className="bg-black/40 border border-white/20 rounded-md p-3 w-2/3 font-mono text-right"
                                    value={collateralAmount}
                                    onChange={e => setCollateralAmount(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Debt Input */}
                        <div>
                            <label className="text-sm font-medium text-gray-300">Borrow</label>
                            <div className="mt-2 flex gap-2">
                                <select 
                                    className="bg-black/40 border border-white/20 rounded-md p-3 w-1/3"
                                    value={debtAsset?.asset.symbol}
                                    onChange={e => setDebtAsset(markets.find(m => m.asset.symbol === e.target.value) || null)}
                                >
                                    {markets.filter(m => m.asset.symbol !== collateralAsset?.asset.symbol).map(m => <option key={m.asset.symbol} value={m.asset.symbol}>{m.asset.symbol}</option>)}
                                </select>
                                <input
                                    type="number"
                                    placeholder="0.0"
                                    className="bg-black/40 border border-white/20 rounded-md p-3 w-2/3 font-mono text-right"
                                    value={debtAmount}
                                    onChange={e => setDebtAmount(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Health Factor Preview */}
                        {healthFactor !== Infinity && (
                             <div className="pt-4">
                                <h3 className="text-sm font-medium mb-2 text-gray-300">Health Factor Preview</h3>
                                <HealthFactorIndicator healthFactor={healthFactor} />
                             </div>
                        )}
                        
                        <Button size="lg" className="w-full">
                            Create Position
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </PageWrapper>
    );
};

export default BorrowPage;
