import React from 'react';

export default function WindIcon({ size = 24, className = "" }) {
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
        d="M 259.69026,7.0073992 C 249.68092,18.343308 212.6558,53.318317 181.76998,60.296011 138.2808,70.121044 88.062396,17.974355 49.493154,39.933335 12.833888,60.804891 4.5770646,149.76911 4.6981717,156.37202 c 0,0 24.7799143,-80.5588 59.8359163,-95.036694 C 101.22483,46.182293 143.0213,98.000849 181.16085,86.773694 217.30944,76.132618 259.69238,8.1422362 259.69026,7.0073992 Z M 256.80828,72.279971 C 188.98733,142.15592 15.759947,24.116325 50.510003,209.96981 L 9.629724,231.75479 48.465906,260.80161 73.505124,232.20892 C 218.89005,287.09623 252.13155,192.83249 256.80828,72.279971 Z"
        fill="currentColor" 
        className="fill-green-700 opacity-70" /* Puedes darle opacidad al relleno por defecto */
      />
      
    </svg>
  );
}