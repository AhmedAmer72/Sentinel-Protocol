
import React from 'react';
import { NavLink } from 'react-router-dom';
import { SentinelLogo } from '../icons/Icons';
import ThemeToggle from '../ui/ThemeToggle';
import ConnectWalletButton from './ConnectWalletButton';
import { cn } from '../../lib/utils';
import { useWallet } from '../providers/WalletProvider';

const Header: React.FC = () => {
  const { isConnected } = useWallet();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-sm font-medium transition-colors hover:text-white",
      isActive ? "text-white" : "text-gray-400"
    );

  const appLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/markets", label: "Markets" },
    { href: "/borrow", label: "Borrow" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <NavLink to="/" className="flex items-center gap-2">
            <SentinelLogo className="h-6 w-6" />
            <span className="font-bold text-lg text-white">Sentinel</span>
          </NavLink>
          <nav className="hidden md:flex items-center gap-6">
             <NavLink to="/features" className={navLinkClass}>Features</NavLink>
             {isConnected && appLinks.map(link => (
                <NavLink key={link.href} to={link.href} className={navLinkClass}>{link.label}</NavLink>
             ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
