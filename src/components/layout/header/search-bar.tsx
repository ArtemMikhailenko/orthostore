'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  isMobile?: boolean;
}

const popularSearches = [
  'Металлические брекеты',
  'Керамические брекеты',
  'Ортодонтические дуги',
  'Лигатуры',
  'Инструменты для установки'
];

const recentSearches = [
  'Брекеты 3M Unitek',
  'Эластики ортодонтические',
  'Плоскогубцы ортодонтические'
];

export function SearchBar({ isOpen = true, onToggle, isMobile = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isMobile && isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMobile, isOpen]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    // Здесь будет логика поиска
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Поиск товаров..."
          className={cn(
            'w-full pl-12 pr-12 py-3 border border-slate-300 rounded-xl bg-slate-50',
            'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white',
            'placeholder-slate-400 transition-all duration-200',
            isMobile ? 'text-base' : 'text-sm'
          )}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-100 rounded-md transition-colors"
          >
            <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
          </button>
        )}
      </div>

      {/* Search Dropdown */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50">
          {query ? (
            // Search Results
            <div className="p-4">
              <div className="text-sm text-slate-500 mb-3 font-medium">
                Результаты поиска для "{query}"
              </div>
              <div className="space-y-1">
                {popularSearches
                  .filter(item => item.toLowerCase().includes(query.toLowerCase()))
                  .slice(0, 5)
                  .map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(item)}
                      className="block w-full text-left px-3 py-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors"
                    >
                      {item}
                    </button>
                  ))
                }
              </div>
            </div>
          ) : (
            // Popular/Recent Searches
            <div className="p-4 space-y-4">
              <div>
                <div className="text-sm font-semibold text-slate-900 mb-3">
                  Популярные запросы
                </div>
                <div className="space-y-1">
                  {popularSearches.slice(0, 3).map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(item)}
                      className="block w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-slate-200 pt-4">
                <div className="text-sm font-semibold text-slate-900 mb-3">
                  Недавние запросы
                </div>
                <div className="space-y-1">
                  {recentSearches.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(item)}
                      className="block w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}