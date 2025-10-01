
import React from 'react';
import PageWrapper from '../components/animations/PageWrapper';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const navigate = useNavigate();
    return (
      <div className="relative isolate py-32 sm:py-48 text-center overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              backgroundImage: 'radial-gradient(circle at center, hsl(var(--accent-hsl) / 0.2), transparent 40%), radial-gradient(circle at 80% 20%, hsl(var(--accent-hsl) / 0.15), transparent 30%), radial-gradient(circle at 20% 80%, hsl(280 90% 60% / 0.15), transparent 30%)',
              backgroundSize: '200% 200%',
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Autonomous, On-Chain Liquidations.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            An autonomous, on-chain liquidation engine powered by Massa’s Autonomous Smart Contracts. Unconditional execution, front-running resistance, radical decentralization.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" onClick={() => navigate('/dashboard')}>
              Launch App
            </Button>
            <Button size="lg" variant="ghost" onClick={() => navigate('/features')}>
              Learn more <span aria-hidden="true">→</span>
            </Button>
          </div>
        </motion.div>
      </div>
    );
};

const HomePage: React.FC = () => {
  return (
    <PageWrapper key="home">
      <HeroSection />
    </PageWrapper>
  );
};

export default HomePage;
