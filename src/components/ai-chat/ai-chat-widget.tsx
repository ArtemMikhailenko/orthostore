'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, Phone, Send as TelegramIcon, MessageSquare } from 'lucide-react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (showChat) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [showChat, messages]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(!isOpen);
    if (showChat) {
      setShowChat(false);
    }
  };

  const openChat = () => {
    setShowChat(true);
    setIsMenuOpen(false);
  };

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
      {/* Main Button */}
      <button
        onClick={toggleMenu}
        className={cn(
          'fixed bottom-6 right-6 z-50 p-3.5 rounded-full shadow-xl transition-all duration-300',
          'bg-gradient-to-br from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700',
          'text-white hover:scale-110 active:scale-95',
          'flex items-center gap-2',
          (isMenuOpen || showChat) && 'scale-0'
        )}
        aria-label="Контакти"
      >
        <MessageCircle className="w-5 h-5" />
        <Sparkles className="w-3.5 h-3.5 absolute -top-0.5 -right-0.5 text-yellow-300 animate-pulse" />
        {/* Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-sky-500 animate-ping opacity-75"></span>
      </button>

      {/* Contact Menu */}
      {isMenuOpen && !showChat && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 animate-in slide-in-from-bottom-4">
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="ml-auto p-2 bg-stone-900 text-white rounded-full shadow-lg hover:bg-stone-800 transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Phone */}
          <a
            href="tel:+380XXXXXXXXX"
            className="flex items-center gap-2.5 bg-white p-3 rounded-xl shadow-md border border-stone-200 hover:border-sky-500 hover:shadow-lg transition-all group w-[280px]"
          >
            <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium text-stone-900 text-sm">Зателефонувати</div>
              <div className="text-xs text-stone-500">Дзвінок менеджеру</div>
            </div>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/orthodentpro"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-white p-3 rounded-xl shadow-md border border-stone-200 hover:border-[#0088cc] hover:shadow-lg transition-all group w-[280px]"
          >
            <div className="w-10 h-10 bg-[#0088cc] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
              <TelegramIcon className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium text-stone-900 text-sm">Telegram</div>
              <div className="text-xs text-stone-500">Написати в месенджер</div>
            </div>
          </a>

          {/* Viber */}
          <a
            href="viber://chat?number=380XXXXXXXXX"
            className="flex items-center gap-2.5 bg-white p-3 rounded-xl shadow-md border border-stone-200 hover:border-[#7360f2] hover:shadow-lg transition-all group w-[280px]"
          >
            <div className="w-10 h-10 bg-[#7360f2] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium text-stone-900 text-sm">Viber</div>
              <div className="text-xs text-stone-500">Чат у Viber</div>
            </div>
          </a>

          {/* AI Assistant */}
          <button
            onClick={openChat}
            className="flex items-center gap-2.5 bg-gradient-to-br from-sky-500 to-sky-600 p-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all group w-[280px]"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform flex-shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="text-left text-white">
              <div className="font-medium flex items-center gap-1.5 text-sm">
                AI Асистент
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs text-sky-100">Розумний помічник 24/7</div>
            </div>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {showChat && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-stone-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div>
                <div className="font-semibold">AI Асистент</div>
                <div className="text-xs text-sky-100">Завжди онлайн</div>
              </div>
            </div>
            <button
              onClick={() => setShowChat(false)}
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
                  <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-sky-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                
                <div
                  className={cn(
                    'max-w-[280px] rounded-2xl px-4 py-3 shadow-sm',
                    message.sender === 'user'
                      ? 'bg-sky-500 text-white rounded-br-sm'
                      : 'bg-white text-stone-800 rounded-bl-sm'
                  )}
                >
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.text}
                  </div>
                  <div
                    className={cn(
                      'text-xs mt-1',
                      message.sender === 'user' ? 'text-sky-100' : 'text-stone-400'
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
                <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-sky-600 rounded-full flex items-center justify-center flex-shrink-0">
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
                className="flex-1 px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-stone-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="p-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
