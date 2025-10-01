
import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { WalletProvider } from './components/providers/WalletProvider';
import Layout from './components/shared/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';

const HomePage = lazy(() => import('./pages/HomePage'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'));
const MarketsPage = lazy(() => import('./pages/MarketsPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const BorrowPage = lazy(() => import('./pages/BorrowPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <ThemeProvider>
      <WalletProvider>
        <HashRouter>
          <Layout>
            <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><LoadingSpinner /></div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/markets" element={<MarketsPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/borrow" element={<BorrowPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Layout>
        </HashRouter>
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App;
