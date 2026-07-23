import React from 'react';

export default function HumidityIcon({ size = 24, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 264.58333 264.58333" /* Asegúrate de poner el viewBox original de tu SVG */
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 1. Tu figura de Relleno */}
      <path 
        d="M 159.67966 10.594185 A 15.08125 14.816667 0 0 0 144.59841 25.410852 A 15.08125 14.816667 0 0 0 159.67966 40.227519 A 15.08125 14.816667 0 0 0 174.76091 25.410852 A 15.08125 14.816667 0 0 0 159.67966 10.594185 z M 210.28122 14.998051 A 26.038763 26.915512 0 0 0 184.2425 41.913721 A 26.038763 26.915512 0 0 0 210.28122 68.82939 A 26.038763 26.915512 0 0 0 236.32046 41.913721 A 26.038763 26.915512 0 0 0 210.28122 14.998051 z M 23.215637 16.924032 C 11.072122 114.65308 19.272872 335.41611 187.23818 232.47883 C 350.22514 132.59252 101.17214 17.678513 23.215637 16.924032 z "
        fill="currentColor" 
        className="fill-blue-500 opacity-70" /* Puedes darle opacidad al relleno por defecto */
      />
      
    </svg>
  );
}   