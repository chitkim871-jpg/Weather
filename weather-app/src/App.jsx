import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import HourlyForecast from "./components/HourlyForecast";
import DateTime from "./components/DateTime";

import {
  getWeather,
  getForecast,
  getHourlyForecast,
} from "./services/weatherApi";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);

  const texts = {
    en: {
      title1: "Weather",
      title2: "Map",
      search: "Search city...",
      forecast: "5-Day Forecast",
      hourly: "Hourly Forecast",
    },
    kh: {
      title1: "អាកាសធាតុ",
      title2: "ផែនទី",
      search: "ស្វែងរកទីក្រុង...",
      forecast: "ការព្យាករណ៍ ៥ ថ្ងៃ",
      hourly: "ម៉ោងរៀងរាល់ថ្ងៃ",
    },
  };

  const searchWeather = async (city) => {
    const cityName = city?.trim();

    if (!cityName) {
      alert("Please enter a city name");
      return;
    }

    try {
      setLoading(true);

      const [weatherData, forecastData, hourlyData] = await Promise.all([
        getWeather(cityName),
        getForecast(cityName),
        getHourlyForecast(cityName),
      ]);

      setWeather(weatherData);
      setForecast(Array.isArray(forecastData) ? forecastData : []);
      setHourlyForecast(Array.isArray(hourlyData) ? hourlyData : []);
    } catch (error) {
      console.error("Weather search error:", error);
      setWeather(null);
      setForecast([]);
      setHourlyForecast([]);
      alert("City not found or API error");
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundImage = () => {
    const condition = forecast?.[0]?.weather?.[0]?.main;

    const images = {
      Clear:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      Clouds:
        "https://images.unsplash.com/photo-1534088568595-a066f410bcda",
      Rain:
        "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0",
      Drizzle:
        "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0",
      Snow:
        "https://images.unsplash.com/photo-1517299321609-52687d1bc55a",
      Thunderstorm:
        "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28",
      Mist:
        "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227",
      Fog:
        "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227",
      Haze:
        "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227",
    };

    return images[condition] || images.Clear;
  };

  useEffect(() => {
    searchWeather("Phnom Penh");
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 transition-all duration-1000"
        style={{
          backgroundImage: `url(${getBackgroundImage()})`,
          filter: "blur(5px)",
          transform: "scale(1.1)",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 min-h-screen p-4">

        {/* HEADER */}
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-center mb-6 gap-3">

          <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold flex-1">
            <span className="text-white drop-shadow-lg">
              {texts[language].title1}
            </span>{" "}
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-pink-500 bg-clip-text text-transparent">
              {texts[language].title2}
            </span>
          </h1>

          {/* LANGUAGE BUTTONS */}
          <div className="flex justify-center md:justify-end gap-2 md:absolute md:right-4 md:top-1/2 md:-translate-y-1/2">

            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-2 rounded-lg ${language === "en"
                ? "bg-blue-500 text-white"
                : "bg-white/20 text-white"
                }`}
            >
              English
            </button>

            <button
              onClick={() => setLanguage("kh")}
              className={`px-3 py-2 rounded-lg ${language === "kh"
                ? "bg-pink-500 text-white"
                : "bg-white/20 text-white"
                }`}
            >
              ខ្មែរ
            </button>

          </div>
        </div>

        {/* DATE TIME */}
        <DateTime />

        {/* SEARCH */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-md">
            <SearchBar
              onSearch={searchWeather}
              placeholder={texts[language].search}
            />
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-1">
            {weather && <WeatherCard weather={weather} />}
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">

            {forecast.length > 0 && (
              <div>
                <h2 className="text-white text-lg font-bold mb-2">
                  {texts[language].forecast}
                </h2>
                <ForecastCard forecast={forecast} />
              </div>
            )}

            {hourlyForecast.length > 0 && (
              <div>
                <h2 className="text-white text-lg font-bold mb-2">
                  {texts[language].hourly}
                </h2>
                <HourlyForecast forecast={hourlyForecast} />
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default App;