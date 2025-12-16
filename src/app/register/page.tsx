'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/auth-store';

export default function RegisterPage() {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !name.trim()) return;
    setLoading(true);
    try {
      register(name.trim(), phone.trim());
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-stone-900 mb-1">Регистрация</h1>
        <p className="text-stone-500 mb-6 text-sm">Заполните данные, чтобы создать профиль</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Имя</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Иван"
              disabled={loading}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Телефон</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+380 50 123 45 67"
              inputMode="tel"
              disabled={loading}
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Создаем…' : 'Зарегистрироваться'}
          </Button>
        </form>
        <div className="text-sm text-stone-600 mt-4">
          Уже есть профиль? <a href="/login" className="text-stone-900 hover:underline">Войти</a>
        </div>
      </div>
    </div>
  );
}
