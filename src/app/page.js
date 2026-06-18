// src/app/page.js
export default function Home() {
  return (
    <main className="min-h-screen w-full bg-linear-to-b from-sky-300 to-blue-500 flex flex-col items-center p-6">
      
      {/* Sección del Buscador */}
      <header className="w-full max-w-md mt-5">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Looking for a city?"
            className="w-full h-14 p-4 rounded-4xl bg-white/70 backdrop-blur-md border border-white text-black placeholder:text-black/50 outline-none drop-shadow-lg focus:ring-2 focus:ring-white/40 focus:scale-102 hover:scale-105 transition-all"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-black bg-white/70 backdrop-blur-md rounded-4xl p-2 opacity-90 drop-shadow-lg hover:scale-105 transition-all">
            Search
          </button>
        </div>
      </header>

      {/* Ciudad Principal (Ubicación actual) */}
      <section className="flex flex-col items-center justify-center m-10 h-72 w-72 p-4 rounded-4xl text-white bg-white/40 backdrop-blur-md border border-white drop-shadow-md hover:scale-102 transition-all">
        <h1 className="text-8xl font-bold">24°</h1>
        <p className="text-2xl font-medium">San Juan de los Morros</p>
        <p className="text-lg opacity-80">Sunny</p>
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