// src/app/page.js

"use client";

import WeatherStatCard from "@/components/weatherstatCard";
import WindIcon from '@/components/icons/windIcon';
import HumidityIcon from '@/components/icons/humidityIcon';
import SearchIcon from '@/components/icons/searchIcon';
import { Droplets, Search} from "lucide-react";
import { useState, useEffect } from "react";


export default function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API;

  useEffect(() => {
    async function initLocationFlow() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            await fetchWeather(latitude, longitude);
          },
          async (error) => {
            console.warn("Geolocation Level 1error:", error);
            await runLevel2();   
          });
        } else {
          await runLevel2();
        }
    }

    async function runLevel2() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data.latitude && data.longitude) {
          await fetchWeather(data.latitude, data.longitude);
        } else {
          runLevel3();
        }
      } catch (error) {
        console.warn("Geolocation Level 1error:", error);
        runLevel3();
      }
    }

    function runLevel3() {
      console.log("Level 3: Default Location");
      fetchWeatherbyCity("Caracas");
    }

    // --- Funciones auxiliares de Fetch ---
    async function fetchWeather(lat, lon) {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error("Error al obtener clima por coordenadas, aplicando fallback...");
        runNivel3();
      } finally {
        setLoading(false);
      }
    }
    async function fetchWeatherbyCity(city) {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setErrorMsg("No se pudo obtener el clima de ninguna ubicación.");
      } finally {
        setLoading(false);
      }
    }
    initLocationFlow();
  }, []);

      

  return (
    <main className="min-h-screen w-full bg-linear-to-b from-sky-300 from-40% to-blue-500 to-90% flex flex-col items-center p-6">
      {/* --- NUBES ANIMADAS EN EL FONDO --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">

        {/* Nube 1: Más arriba y más lenta */}
        <img
          src="/icons/nube1.svg"
          alt="nube"
          className="absolute top-16 w-36 md:w-56 opacity-90 animate-cloud-slow"
          style={{ animationDelay: '0s' }}
        />

        {/* Nube 2: Un poco más abajo, más rápida y con un delay inicial */}
        <img
          src="/icons/nube2.svg"
          alt="nube"
          className="absolute top-44 w-28 md:w-44 opacity-80 animate-cloud-fast"
          style={{ animationDelay: '-10s' }} /* El número negativo hace que la animación ya haya comenzado al cargar */
        />

      </div>
      
      {/* Sección del Buscador */}
      <header className="w-full max-w-md mt-3 z-10">
        <div className="relative group">
          <input
            type="text"
            placeholder="Looking for a city?"
            className="w-full h-12 p-4 rounded-4xl bg-linear-to-b from-white/50 from-70% to-gray-300/30 to-90% backdrop-blur-xs border-2 border-white text-black placeholder:text-black/50 outline-none drop-shadow-md focus:ring-2  focus:ring-white/40 focus:bg-white hover:scale-102 transition-all"
          />
          <button className="absolute items-center right-1 top-1/2 w-10 h-10 -translate-y-1/2 text-black bg-white/90 backdrop-blur-md rounded-4xl p-2 opacity-90 drop-shadow-lg hover:scale-105 transition-all">
            <SearchIcon size={24} />
          </button>
        </div>
      </header>

      {/* Frame principal */}
      <section className="flex flex-col items-center mt-20 m-10 h-58 w-58 rounded-4xl text-white bg-linear-to-b from-white/50 from-70% to-gray-300/30 backdrop-blur-xs border-2 border-white drop-shadow-md hover:scale-102 transition-all">
        <h1 className="text-8xl font-bold drop-shadow-lg hover:scale-105 transition-all">
          {Math.round(weather?.main?.temp)}°
        </h1>
        <p className="text-lg font-medium drop-shadow-md">{weather?.weather?.[0]?.main}</p>
        <p className="text-sm opacity-70 text-gray-600 drop-shadow-md">{weather?.name}</p>

        <div className="flex items-center justify-center gap-4 mt-4">
          {/* Cajita 1: Humedad */}
          <WeatherStatCard
            icon={() => <HumidityIcon size={26} />}
            value={`${weather?.main?.humidity}%`}
          />
          {/* Cajita 2: País (Bandera) */}
          <WeatherStatCard
            icon={
              weather?.sys?.country
                ? `https://flagsapi.com/${weather.sys.country}/flat/24.png`
                : `https://flagsapi.com/VE/flat/24.png` /* Fallback por si acaso */
            }
            value={weather?.sys?.country}
          />
          {/* Cajita 3: Viento */}
          <WeatherStatCard
            icon={() => <WindIcon size={26} />}
            value={`${Math.round(weather?.wind?.speed * 3.6)}`} /* Conversión de m/s a Km/h */
          />
        </div>
      </section>


      {/* --- SECCIÓN INFERIOR: COLINA Y CIUDADES POPULARES --- */}
      <section className="absolute bottom-0 left-0 w-full h-[30%] flex flex-col justify-end pointer-events-none">

        {/* La Colina Verde */}
        {/* Usamos rounded-t-[50%_30px] para crear una elipse suave arriba */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] h-[75%] bg-linear-to-b from-green-500 to-green-700 rounded-t-[50%_40px] shadow-[inset_0_4px_10px_rgba(255,255,255,0.2)] z-10" />

        {/* Contenedor del Carrusel de Ciudades */}
        {/* pointer-events-auto reactiva los clicks de las tarjetas por encima de la colina */}
        <div className="relative z-20 w-full overflow-x-auto no-scrollbar pb-6 px-6 pointer-events-auto">
          <div className="flex gap-4 w-max mx-auto md:justify-center">

            {/* Tarjeta de Ejemplo 1: Maracay */}
            <div className="w-36 h-24 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 p-3 text-white flex flex-col justify-between shadow-lg transition-transform hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-sm leading-tight">Maracay</h3>
                  <p className="text-[10px] opacity-80">Storm</p>
                </div>
                <img src="https://flagsapi.com/VE/flat/32.png" alt="VE" className="w-4 h-auto" />
              </div>
              <div className="flex justify-between items-end">
                {/* Aquí iría el icono de tormenta de Lucide */}
                <span className="text-xs">⚡</span>
                <span className="text-2xl font-bold leading-none">21°</span>
              </div>
            </div>



            {/* Añade más tarjetas aquí para probar el deslizamiento */}

          </div>
        </div>
      </section>

    </main>
  );
}