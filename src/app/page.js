// src/app/page.js

"use client";

import WeatherStatCard from "@/components/weatherstatCard";
import { Droplets, Wind, Flag, Search} from "lucide-react";
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
      {/* Sección del Buscador */}
      <header className="w-full max-w-md mt-5">
        <div className="relative group">
          <input
            type="text"
            placeholder="Looking for a city?"
            className="w-full h-12 p-4 rounded-4xl bg-linear-to-b from-white/70 from-70% to-gray-300/70 to-90% backdrop-blur-md border-2 border-white text-black placeholder:text-black/50 outline-none drop-shadow-md focus:ring-2 focus:ring-white/40 hover:scale-102 transition-all"
          />
          <button className="absolute items-center  right-1 top-1/2 w-10 h-10 -translate-y-1/2 text-black bg-white/90 backdrop-blur-md rounded-4xl p-2 opacity-90 drop-shadow-lg hover:scale-105 transition-all">
            <Search size={22} color="blue" />
          </button>
        </div>
      </header>

      {/* Frame principal */}
      <section className="flex flex-col items-center m-10 h-58 w-58 p-4 rounded-4xl text-white bg-linear-to-b from-white/50 from-70% to-gray-300/50 backdrop-blur-md border-2 border-white drop-shadow-md hover:scale-102 transition-all">
        <h1 className="text-8xl font-bold">
          {Math.round(weather?.main?.temp)}°
        </h1>
        <p className="text-lg font-medium">{weather?.weather?.[0]?.main}</p>
        <p className="text-sm opacity-70 text-gray-600">{weather?.name}</p>

        <div className="flex items-center justify-center gap-3 mt-">
          {/* Cajita 1: Humedad */}
          <WeatherStatCard
            icon={Droplets}
            value={`${weather?.main?.humidity}%`}
          />
          {/* Cajita 2: País (Bandera) */}
          <WeatherStatCard
            icon={Flag}
            value={weather?.sys?.country}
          />
          {/* Cajita 3: Viento */}
          <WeatherStatCard
            icon={Wind}
            value={`${Math.round(weather?.wind?.speed * 3.6)}`} /* Conversión de m/s a Km/h */
          />
        </div>
      </section>

      {/* Grid de Ciudades Populares (Filter/Map) */}
      <section className="w-full max-w-3xl grid grid-cols-3 md:grid-cols-4 gap-4 mb-10">
        {/* Aquí haremos el .map() de tus ciudades favoritas más adelante */}
        <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white">
          <p className="font-bold">Caracas</p>
          <p>28°</p>
        </div>
      </section>
    </main>
  );
}