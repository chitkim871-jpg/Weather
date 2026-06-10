import weatherImages from "../data/weatherImages";

function WeatherCard({ weather }) {
  if (!weather) return null;

  const getWeatherImage = (condition) => {
    return weatherImages[condition] || weatherImages.Clear;
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-blue-500 ">

      {/* Background Image */}
      <img
        src={getWeatherImage(weather.weather[0].main)}
        alt={weather.weather[0].main}
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      {/* Overlay */}
      <div className="absolute inset-0 " />

      {/* Content */}
      <div className="relative z-10 p-6 text-center text-white">

        <h2 className="text-3xl font-bold">
          {weather.name}
        </h2>

        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt={weather.weather[0].description}
          className="mx-auto w-32 h-32"
        />

        <h1 className="text-6xl font-bold">
          {Math.round(weather.main.temp)}°C
        </h1>

        <p className="text-lg capitalize text-white/90 mt-2">
          {weather.weather[0].description}
        </p>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-blue-600 rounded-2xl p-4 border border-blue-500">
            <p className="text-white/70 text-sm">Humidity</p>
            <h3 className="text-xl font-bold">
              {weather.main.humidity}%
            </h3>
          </div>

          <div className="bg-blue-600  rounded-2xl p-4 border border-blue-500">
            <p className="text-white/70 text-sm">Wind</p>
            <h3 className="text-xl font-bold">
              {weather.wind.speed} km/h
            </h3>
          </div>

          <div className="bg-blue-600 rounded-2xl p-4 border border-blue-500">
            <p className="text-white/70 text-sm">Feels Like</p>
            <h3 className="text-xl font-bold">
              {Math.round(weather.main.feels_like)}°C
            </h3>
          </div>

          <div className="bg-blue-600 rounded-2xl p-4 border border-blue-500">
            <p className="text-white/70 text-sm">Pressure</p>
            <h3 className="text-xl font-bold">
              {weather.main.pressure} hPa
            </h3>
          </div>
        </div>

      </div>
    </div>
  );
}

export default WeatherCard;