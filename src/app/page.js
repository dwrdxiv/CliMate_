// src/app/page.js

"use client";

import WeatherStatCard from "@/components/weatherstatCard";
import WindIcon from '@/components/icons/windIcon';
import HumidityIcon from '@/components/icons/humidityIcon';
import SearchIcon from '@/components/icons/searchIcon';
import MainCardSkeleton from "@/components/MainCardSkeleton";
import { useState, useEffect } from "react";


export default function Home() {
  const [rouletteCities, setRouletteCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [homeWeather, setHomeWeather] = useState(null);
  
  const handleSelectCity = (cityData) => {
    setWeather(cityData);
  };
  const handleBackHome = () => {
    if (homeWeather) {
      setWeather(homeWeather);
    }
  };
  const isNotHome = weather && homeWeather && weather.id !== homeWeather.id;

  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setErrorMsg("");
    
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(searchTerm)}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("City not found");
        } else {
          throw new Error("Error fetching weather data");
        }
      }
      const data = await res.json();
      setWeather(data);
      setSearchTerm("")
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchRouletteCities() {
      // Lista de ciudades geniales y variadas
      const candidateCities = [
        "Tokyo", "London", "New York", "Paris", "Sydney", 
        "Caracas", "Maracay", "Madrid", "Rome", "Berlin", 
        "Buenos Aires", "Toronto", "Seoul"
      ];

      // Barajar el array y tomar las primeras 5 (Aleatoriedad)
      const randomFive = candidateCities
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

      try {
        // Ejecutar las 5 peticiones a la vez (Promise.all es mucho más rápido)
        const promises = randomFive.map(city => 
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then(res => res.json())
        );
        
        const results = await Promise.all(promises);
        
        // Filtramos por si alguna ciudad falló y guardamos en el estado
        setRouletteCities(results.filter(data => data.cod === 200));
      } catch (error) {
        console.error("Error cargando la ruleta:", error);
      }
    }

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
        setHomeWeather(data); // Guardamos el clima de la ubicación inicial
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
    fetchRouletteCities();
  }, []);

  const getWeatherIcon = (weatherItem) => {
    if (!weatherItem) return "/icons/dayclear.svg"; // Fallback

    const main = weatherItem.main;
    const iconCode = weatherItem.icon; // Código del icono proporcionado por OpenWeatherMap
    const isNight = iconCode?.endsWith("n"); // Determina si es de noche
    
    switch (main) {
      case "Clear":
        return isNight ? "/icons/nightclear.svg" : "/icons/dayclear.svg";
      case "Clouds":
        return isNight ? "/icons/cloudymoon.svg" : "/icons/cloudysun.svg";
      case "Rain":
      case "Drizzle":
        return "/icons/rainy.svg";
      case "Thunderstorm":
        return "/icons/storm.svg";
      default:
        return isNight ? "/icons/nightclear.svg" : "/icons/dayclear.svg"; // Fallback
    }
  };

  return (
    <main className="relative h-screen w-full bg-linear-to-b from-sky-300 from-40% to-blue-500 to-90% flex flex-col items-center p-6 overflow-hidden select-none">
      {/* --- NUBES ANIMADAS EN EL FONDO --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-18 -right-24 w-58 h-58 md:w-76 md:h-76 flex items-center justify-center">

          {/* Resplandor/Glow de fondo (Luz difusa) */}
          <div className="absolute inset-0 rounded-full bg-yellow-400/40 blur-2xl transform scale-125" />

          {/* Tu SVG de Sol girando lentamente sobre su propio eje */}
          <img
            src="/icons/mainsun.svg"
            alt="Sol"
            className="w-full h-full object-contain animate-spin-slow drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]"
          />
        </div>


        {/* Nube 1: Más arriba y más lenta */}
        <img
          src="/icons/nube1.svg"
          alt="nube"
          className="absolute top-28 w-48 md:w-56 opacity-90 animate-cloud-slow"
          style={{ animationDelay: '0s' }}
        />

        {/* Nube 2: Un poco más abajo, más rápida y con un delay inicial */}
        <img
          src="/icons/nube2.svg"
          alt="nube"
          className="absolute top-64 w-40 md:w-44 opacity-80 animate-cloud-fast"
          style={{ animationDelay: '-10s' }} /* El número negativo hace que la animación ya haya comenzado al cargar */
        />
        <img
          src="/icons/nube1.svg"
          alt="nube"
          className="absolute top-49 w-38 md:w-56 opacity-90 animate-cloud-slow"
          style={{ animationDelay: '-5s' }}
        />

      </div>
      
      {/* Sección del Buscador */}
      <header className="w-full max-w-md mt-3 z-10">
        <form onSubmit={handleSearch} className="relative group">
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Looking for a city?"
            className="w-full h-12 p-4 rounded-4xl bg-linear-to-b from-white/50 from-70% to-gray-300/30 to-90% backdrop-blur-xs border-2 border-white text-black placeholder:text-black/50 outline-none drop-shadow-md focus:ring-2  focus:ring-white/40 focus:bg-white hover:scale-102 transition-all"
          />

          <button type="submit" className="absolute items-center right-1 top-1/2 w-10 h-10 -translate-y-1/2 text-black bg-white/90 backdrop-blur-md rounded-4xl p-2 opacity-90 drop-shadow-lg hover:scale-105 hover:cursor-pointer transition-all">
            <SearchIcon size={24} />
          </button>
        </form>
      </header>

      {/* Frame principal */}
      <section className="relative z-10 flex flex-col items-center justify-center text-white text-center w-full px-4">
      { loading || !weather?.main? (
        <MainCardSkeleton />
      ) : (

        <section className="flex flex-col items-center mt-26 m-10 h-58 w-58 rounded-4xl text-white bg-linear-to-b from-white/50 from-70% to-gray-300/30 backdrop-blur-xs border-2 border-white drop-shadow-md transition-all">
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
              value={`${Math.round(weather?.wind?.speed * 3.6)}Km`} /* Conversión de m/s a Km/h */
            />

            
          </div>
          {isNotHome && (
                  <button
                    onClick={handleBackHome}
                    className="mt-4 flex items-center gap-2 px-2 py-2 cursor-pointer rounded-full bg-white/30 hover:bg-white/40 backdrop-blur-md border border-white text-white text-xs font-semibold shadow-md transition-all transform hover:scale-105 active:scale-95 animate-fade-in">
                    <img src="/icons/home.svg" alt="Home" className="w-4 h-4" />
                  </button>
            )}
        </section>)}
      </section>


      {/* --- SECCIÓN INFERIOR: COLINA Y CIUDADES POPULARES --- */}
      <section className="absolute bottom-0 left-0 w-full h-[30%] flex flex-col justify-end pointer-events-none">
   
        {/* La Colina Verde */}
        {/* Usamos rounded-t-[50%_30px] para crear una elipse suave arriba */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] h-[75%] bg-linear-to-b from-green-500 to-green-700 rounded-t-[50%_40px] shadow-[inset_0_4px_10px_rgba(255,255,255,0.2)] z-10" />

        {/* Contenedor del Carrusel de Ciudades */}
        {/* pointer-events-auto reactiva los clicks de las tarjetas por encima de la colina */}
        {/* El contenedor que se mueve. Usamos w-max para que no se comprima */}
        <div className="flex w-max animate-roulette gap-4 z-12 pl-4 pointer-events-auto">
          
          {/* Renderizamos la lista CUATRO veces para hacer el bucle infinito */}
          {[...rouletteCities, ...rouletteCities, ...rouletteCities, ...rouletteCities].map((cityData, index) => (
            <div 
              key={`${cityData.id}-${index}`}
              onClick={ () => handleSelectCity(cityData)}
              className="w-40 h-25 mb-6 z-15 bg-linear-to-b from-white/40 from-70% to-gray-300/60 backdrop-blur-xs border border-white drop-shadow-md rounded-2xl p-1 flex flex-col justify-between text-white cursor-pointer hover:scale-105 transition-all"
            >
              <div className="flex justify-between items-start z-15">
                <div>
                  <h3 className="font-bold text-lg truncate w-24">{cityData.name}</h3>
                  <p className="text-xs opacity-80 capitalize">{cityData.weather[0]?.main}</p>
                </div>
                {/* Bandera del país */}
                <img 
                  src={`https://flagsapi.com/${cityData.sys.country}/flat/32.png`} 
                  alt={cityData.sys.country}
                  className="w-9 h-9 rounded-md drop-shadow-md"
                />
              </div>
              
              <div className="flex justify-between items-start z-15">
                {/* Aquí puedes usar tu componente SVG o una imagen estática */}
                <img 
                  src={getWeatherIcon(cityData.weather[0])} 
                  alt={cityData.weather[0]?.main}
                  className = "w-13 h-13 object-contain rounded-4xl drop-shadow-md"
                />
                <span className="text-3xl font-bold drop-shadow-md">{Math.round(cityData.main.temp)}°</span>
              </div>
            </div>
          ))}

        </div>
      </section>

    </main>
  );
}