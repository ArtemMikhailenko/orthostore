'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: 1,
  text: 'Вітаю! Я AI-асістент OrthoDent Pro. 🦷\n\nЯ можу допомогти вам:\n• Підібрати потрібні ортодонтичні товари\n• Розповісти про ціни та характеристики\n• Відповісти на питання про доставку\n• Порадити оптимальні варіанти\n\nЧим можу допомогти?',
  sender: 'ai',
  timestamp: new Date(),
};

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    const userQuestion = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Call Groq API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userQuestion,
          conversationHistory: messages.slice(-5) // Last 5 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error('AI response failed');
      }

      const data = await response.json();
      
      const aiResponse: Message = {
        id: messages.length + 2,
        text: data.response,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('AI Error:', error);
      // Fallback to mock response
      const aiResponse: Message = {
        id: messages.length + 2,
        text: 'Вибачте, виникла помилка з\'єднання. Спробуйте ще раз або зв\'яжіться з нашою підтримкою.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300',
          'bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
          'text-white hover:scale-110 active:scale-95',
          'flex items-center gap-2',
          isOpen && 'scale-0'
        )}
        aria-label="AI Консультант"
      >
        <MessageCircle className="w-6 h-6" />
        <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
        {!isOpen && (
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 rounded-full animate-ping" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-stone-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div>
                <div className="font-semibold">AI Асистент</div>
                <div className="text-xs text-emerald-100">Завжди онлайн</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3',
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.sender === 'ai' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                
                <div
                  className={cn(
                    'max-w-[280px] rounded-2xl px-4 py-3 shadow-sm',
                    message.sender === 'user'
                      ? 'bg-emerald-500 text-white rounded-br-sm'
                      : 'bg-white text-stone-800 rounded-bl-sm'
                  )}
                >
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.text}
                  </div>
                  <div
                    className={cn(
                      'text-xs mt-1',
                      message.sender === 'user' ? 'text-emerald-100' : 'text-stone-400'
                    )}
                  >
                    {message.timestamp.toLocaleTimeString('uk-UA', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>

                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-stone-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-stone-200">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Напишіть повідомлення..."
                className="flex-1 px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-stone-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-stone-400 mt-2 text-center">
              Powered by OrthoDent AI ✨
            </div>
          </div>
        </div>
      )}
    </>
  );
}
