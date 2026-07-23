import React from 'react';

export default function SearchIcon({ size = 24, className = "" }) {
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
        d="M 133.71432 10.423653 A 117.88143 118.3707 0 0 0 15.832625 128.79472 A 117.88143 118.3707 0 0 0 133.71432 247.16528 A 117.88143 118.3707 0 0 0 206.32022 222.04743 L 230.12342 260.55567 L 262.10597 218.88276 L 227.93958 199.9232 A 117.88143 118.3707 0 0 0 251.5955 128.79472 A 117.88143 118.3707 0 0 0 133.71432 10.423653 z M 130.58273 39.377441 A 91.546237 87.305704 65.199182 0 1 222.00815 116.57945 A 91.546237 87.305704 65.199182 0 1 151.78608 219.9659 A 91.546237 87.305704 65.199182 0 1 48.925179 143.77055 A 91.546237 87.305704 65.199182 0 1 119.14725 40.384098 A 91.546237 87.305704 65.199182 0 1 130.58273 39.377441 z "
        fill="currentColor" 
        className="fill-cyan-700" /* Puedes darle opacidad al relleno por defecto */
      />
      
    </svg>
  );
}