
import React from 'react';
import PageWrapper from '../components/animations/PageWrapper';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { motion } from 'framer-motion';

const features = [
  {
    title: "Autonomous Smart Contracts",
    description: "Utilizes Massa's native ASCs for guaranteed on-chain scheduling of health checks and liquidations. No external bots, no fragile keeper model.",
  },
  {
    title: "Front-running Resistance",
    description: "Atomic state-read and action in a single execution window largely eliminates mempool games and MEV exploitation during liquidations.",
  },
  {
    title: "Radical Decentralization",
    description: "Contracts on Massa, UI hosted on DeWeb, and powered by an MNS .massa domain. A truly unstoppable protocol.",
  },
  {
    title: "Capital Efficiency",
    description: "Liquidation value, including penalties and bonuses, accrues directly to the protocol treasury/DAO instead of being paid out to external keepers.",
  },
    {
    title: "Protocol Trust",
    description: "Shifting the trust model from unpredictable economic incentives of keepers to the deterministic, verifiable trust in the protocol's code.",
  },
  {
    title: "Pluggable Oracles",
    description: "Designed with a flexible oracle adapter to integrate with various price sources, including TWAPs from DEXs like Dusa.",
  },
];

const FeaturesPage: React.FC = () => {
  return (
    <PageWrapper key="features">
      <div className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Protocol Redefined</h1>
          <p className="mt-4 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            Sentinel replaces fragile, off-chain systems with deterministic on-chain logic.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default FeaturesPage;
