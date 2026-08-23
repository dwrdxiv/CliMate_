// src/components/MainCardSkeleton.jsx
import React from 'react';

export default function MainCardSkeleton() {
  return (
    <div className="flex flex-col items-center mt-26 m-10 h-58 w-58 rounded-4xl text-white bg-linear-to-b from-white/50 from-70% to-gray-300/30 backdrop-blur-xs border-2 border-white drop-shadow-md hover:scale-102 transition-all">
      
      {/* Skeleton Temperatura */}
      <div className="h-80 w-36 bg-white/40 rounded-2xl mb-2 mt-4" />

      {/* Skeleton Estado del Clima (ej: Clouds) */}
      <div className="h-12 w-24 bg-white/40 rounded-md mb-2" />

      {/* Skeleton Nombre Ciudad */}
      <div className="h-10 w-32 bg-white/40 rounded-md mb-4" />

      {/* Skeleton de las 3 Cajitas Inferiores */}
      <div className="flex items-center justify-center gap-2 w-full mb-2">
        <div className="w-16 h-16 bg-white/40 rounded-3xl" />
        <div className="w-16 h-16 bg-white/40 rounded-3xl" />
        <div className="w-16 h-16 bg-white/40 rounded-3xl" />
      </div>

    </div>
  );
}