'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function FloatingElements() {
  // Medical icons and elements
  const medicalElements = [
    { icon: '🦷', size: 'text-3xl', delay: 0 },
    { icon: '💎', size: 'text-2xl', delay: 1 },
    { icon: '⚡', size: 'text-xl', delay: 2 },
    { icon: '🔬', size: 'text-2xl', delay: 0.5 },
    { icon: '🎯', size: 'text-xl', delay: 1.5 },
    { icon: '✨', size: 'text-lg', delay: 2.5 },
  ];

  // Geometric shapes
  const shapes = [
    { type: 'circle', delay: 0.2 },
    { type: 'square', delay: 1.2 },
    { type: 'triangle', delay: 2.2 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Medical Icons */}
      {medicalElements.map((element, index) => (
        <motion.div
          key={`icon-${index}`}
          className={`absolute ${element.size} opacity-20`}
          style={{
            left: `${10 + (index * 15) % 80}%`,
            top: `${20 + (index * 12) % 60}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 180, 360],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          {element.icon}
        </motion.div>
      ))}

      {/* Geometric Shapes */}
      {shapes.map((shape, index) => (
        <motion.div
          key={`shape-${index}`}
          className="absolute opacity-10"
          style={{
            right: `${15 + index * 25}%`,
            top: `${25 + index * 20}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 12 + index * 3,
            repeat: Infinity,
            delay: shape.delay,
            ease: "linear",
          }}
        >
          {shape.type === 'circle' && (
            <div className="w-16 h-16 border-2 border-blue-400 rounded-full" />
          )}
          {shape.type === 'square' && (
            <div className="w-12 h-12 border-2 border-purple-400 rotate-45" />
          )}
          {shape.type === 'triangle' && (
            <div className="w-0 h-0 border-l-8 border-r-8 border-b-14 border-transparent border-b-green-400" />
          )}
        </motion.div>
      ))}

      {/* Gradient Orbs */}
      {[...Array(4)].map((_, index) => (
        <motion.div
          key={`orb-${index}`}
          className="absolute rounded-full blur-xl opacity-20"
          style={{
            background: index % 2 === 0 
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, transparent 70%)',
            width: `${60 + index * 40}px`,
            height: `${60 + index * 40}px`,
            left: `${20 + index * 20}%`,
            top: `${30 + index * 15}%`,
          }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.1, 0.4, 0.1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15 + index * 5,
            repeat: Infinity,
            delay: index * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Lines */}
      <svg className="absolute inset-0 w-full h-full">
        {[...Array(3)].map((_, index) => (
          <motion.path
            key={`line-${index}`}
            d={`M ${50 + index * 200} ${100 + index * 150} Q ${200 + index * 100} ${50 + index * 100} ${400 + index * 150} ${200 + index * 100}`}
            stroke={index % 2 === 0 ? "rgba(59, 130, 246, 0.2)" : "rgba(147, 51, 234, 0.2)"}
            strokeWidth="2"
            fill="none"
            strokeDasharray="10,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0], 
              opacity: [0, 0.6, 0] 
            }}
            transition={{
              duration: 10 + index * 3,
              repeat: Infinity,
              delay: index * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* DNA Helix Pattern */}
      <motion.div
        className="absolute right-10 top-20 opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <svg width="80" height="200" viewBox="0 0 80 200">
          <path
            d="M 20 0 Q 60 50 20 100 Q 60 150 20 200"
            stroke="rgba(59, 130, 246, 0.8)"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 60 0 Q 20 50 60 100 Q 20 150 60 200"
            stroke="rgba(147, 51, 234, 0.8)"
            strokeWidth="3"
            fill="none"
          />
          {[...Array(10)].map((_, i) => (
            <line
              key={i}
              x1="20"
              y1={i * 20}
              x2="60"
              y2={i * 20}
              stroke="rgba(16, 185, 129, 0.6)"
              strokeWidth="1"
            />
          ))}
        </svg>
      </motion.div>

      {/* Particle System */}
      {[...Array(20)].map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-100, window.innerHeight + 100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}

      {/* Medical Cross */}
      <motion.div
        className="absolute bottom-20 left-10 opacity-5"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60">
          <rect x="20" y="5" width="20" height="50" fill="rgba(59, 130, 246, 0.8)" />
          <rect x="5" y="20" width="50" height="20" fill="rgba(59, 130, 246, 0.8)" />
        </svg>
      </motion.div>

      {/* Pulse Rings */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 4, 6], 
          opacity: [0.5, 0.2, 0] 
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeOut",
        }}
      >
        <div className="w-20 h-20 border border-blue-300 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 4, 6], 
          opacity: [0.5, 0.2, 0] 
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 2,
          ease: "easeOut",
        }}
      >
        <div className="w-20 h-20 border border-purple-300 rounded-full" />
      </motion.div>
    </div>
  );
}