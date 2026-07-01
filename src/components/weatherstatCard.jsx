// src/components/WeatherStatCard.jsx
import React from 'react';

// Pasamos las props usando destructuring
const WeatherStatCard = ({ icon: Icon, value }) => {
  return (
    <div className="bg-linear-to-b from-white/40 from-50% to-cyan-200/40 to-90% backdrop-blur-sm rounded-3xl p-3 flex flex-col items-center justify-center w-15 h-15 transition-transform hover:scale-102">
      {/* Icono dinámico de Lucide */}
      <div className="text-blue-500 mb-1">
        <Icon size={20} />
      </div>
      
      {/* Valor (ej: 78%) */}
      <span className="text-sm text-gray-800">{value}</span>
    </div>
  );
};

export default WeatherStatCard;