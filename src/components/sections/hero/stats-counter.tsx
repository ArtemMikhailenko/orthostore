'use client';

import React from 'react';

interface StatsCounterProps {
  number: string | number;
  label: string;
  delay?: number;
  isVisible?: boolean;
}

export function StatsCounter({ number, label }: StatsCounterProps) {
  return (
    <div className="text-center">
      <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
        {number}
      </div>
      <div className="text-gray-600 font-medium">
        {label}
      </div>
    </div>
  );
}