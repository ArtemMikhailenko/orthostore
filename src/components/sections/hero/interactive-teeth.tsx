'use client';

import React from 'react';

interface InteractiveTeethProps {
  currentBraceType?: 'metal' | 'ceramic' | 'sapphire';
  onBraceTypeChange?: (type: 'metal' | 'ceramic' | 'sapphire') => void;
}

export function InteractiveTeeth({ currentBraceType, onBraceTypeChange }: InteractiveTeethProps) {
  return (
    <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
      <div className="text-gray-400 text-center">
        <div className="text-2xl mb-2">🦷</div>
        <div className="text-sm">Профессиональная ортодонтия</div>
      </div>
    </div>
  );
}