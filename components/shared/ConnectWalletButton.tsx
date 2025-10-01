
import React from 'react';
import { useWallet } from '../providers/WalletProvider';
import Button from '../ui/Button';

const ConnectWalletButton: React.FC = () => {
  const { isConnected, address, connect, disconnect } = useWallet();

  if (isConnected && address) {
    return (
      <Button onClick={disconnect} variant="secondary" className="font-mono text-xs">
        {address.slice(0, 6)}...{address.slice(-4)}
      </Button>
    );
  }

  return <Button onClick={connect}>Connect Wallet</Button>;
};

export default ConnectWalletButton;
