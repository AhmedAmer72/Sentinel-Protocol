
import React from 'react';
import { cn } from '../../lib/utils';
import { HealthFactorStatus } from '../../types';

interface HealthFactorIndicatorProps {
  healthFactor: number;
}

const HealthFactorIndicator: React.FC<HealthFactorIndicatorProps> = ({ healthFactor }) => {
  let status: HealthFactorStatus;
  let colorClasses: string;

  if (healthFactor >= 1.5) {
    status = HealthFactorStatus.HEALTHY;
    colorClasses = 'text-green-400 bg-green-900/50';
  } else if (healthFactor >= 1.1) {
    status = HealthFactorStatus.RISKY;
    colorClasses = 'text-yellow-400 bg-yellow-900/50';
  } else {
    status = HealthFactorStatus.UNHEALTHY;
    colorClasses = 'text-red-400 bg-red-900/50';
  }

  const percentage = Math.min((healthFactor / 2) * 100, 100);

  return (
    <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
            <span className={cn('text-sm font-semibold', colorClasses.split(' ')[0])}>{status}</span>
            <span className="text-sm font-bold text-white">{healthFactor.toFixed(2)}</span>
        </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className={cn('h-2 rounded-full', status === HealthFactorStatus.HEALTHY ? 'bg-green-500' : status === HealthFactorStatus.RISKY ? 'bg-yellow-500' : 'bg-red-500')}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default HealthFactorIndicator;
