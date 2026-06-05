function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="bg-white/20 backdrop-blur-xl shadow-xl rounded-3xl p-6 text-center">

      {/* City */}
      <h2 className="text-3xl font-bold text-white">
        {weather.name}
      </h2>

      {/* Weather Icon */}
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
        alt={weather.weather[0].description}
        className="mx-auto w-28 h-28"
      />

      {/* Temperature */}
      <h1 className="text-6xl font-bold text-white">
        {Math.round(weather.main.temp)}°C
      </h1>

      {/* Description */}
      <p className="text-white/80 capitalize text-lg mt-2">
        {weather.weather[0].description}
      </p>

      {/* Weather Info */}
      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
          <p className="text-white/70 text-sm">Humidity</p>
          <h3 className="text-xl font-bold text-white">
            {weather.main.humidity}%
          </h3>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
          <p className="text-white/70 text-sm">Wind</p>
          <h3 className="text-xl font-bold text-white">
            {weather.wind.speed} km/h
          </h3>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
          <p className="text-white/70 text-sm">Feels Like</p>
          <h3 className="text-xl font-bold text-white">
            {Math.round(weather.main.feels_like)}°C
          </h3>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
          <p className="text-white/70 text-sm">Pressure</p>
          <h3 className="text-xl font-bold text-white">
            {weather.main.pressure} hPa
          </h3>
        </div>

      </div>

    </div>
  );
}

export default WeatherCard;