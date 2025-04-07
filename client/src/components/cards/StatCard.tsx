
import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  change?: {
    value: string | number;
    positive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  change,
  className,
}) => {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm p-5 flex flex-col", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      
      <div className="mt-2">
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
      
      {change && (
        <div className="mt-2 flex items-center">
          <span
            className={`text-xs font-medium ${
              change.positive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {change.positive ? '+' : '-'} {change.value}
          </span>
          {subtitle && <span className="text-xs text-gray-500 ml-1">vs last period</span>}
        </div>
      )}
    </div>
  );
};

export default StatCard;
