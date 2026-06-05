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

import backgroundImage from "./assets/weather-bg.jpg";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);

  // 🌍 Language state
  const [language, setLanguage] = useState("en");

  // 🌐 Text translation
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
      hourly: "ម៉ោងរៀងរាល់ម៉ោង",
    },
  };

  const searchWeather = async (city) => {
    try {
      const weatherData = await getWeather(city);
      const forecastData = await getForecast(city);
      const hourlyData = await getHourlyForecast(city);

      setWeather(weatherData);
      setForecast(forecastData);
      setHourlyForecast(hourlyData);
    } catch (error) {
      console.error(error);
      alert("City not found");
    }
  };

  useEffect(() => {
    searchWeather("Phnom Penh");
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[20px] scale-110"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 min-h-screen p-4">

        {/* 🌍 Header + Language Switch */}
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-center mb-6 gap-3">

          {/* TITLE */}
          <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold flex-1">
            <span className="text-white drop-shadow-lg">
              {texts[language].title1}
            </span>{" "}
            <span className="bg-linear-to-r from-sky-400 via-blue-500 to-pink-500 bg-clip-text text-transparent">
              {texts[language].title2}
            </span>
          </h1>

          {/* LANGUAGE BUTTONS */}
          <div className="flex justify-center md:justify-end gap-2 md:absolute md:right-4 md:top-1/2 md:-translate-y-1/2">

            <button
              onClick={() => setLanguage("en")}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg transition-all duration-200 ${language === "en"
                  ? "bg-blue-500 text-white shadow-lg scale-105"
                  : "bg-white/20 text-white hover:bg-white/30"
                }`}
            >
              English
            </button>

            <button
              onClick={() => setLanguage("kh")}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg transition-all duration-200 ${language === "kh"
                  ? "bg-pink-500 text-white shadow-lg scale-105"
                  : "bg-white/20 text-white hover:bg-white/30"
                }`}
            >
              ខ្មែរ
            </button>

          </div>

        </div>

        {/* Date & Time */}
        <DateTime />

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-md">
            <SearchBar
              onSearch={searchWeather}
              placeholder={texts[language].search}
            />
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Side */}
          <div className="lg:col-span-1">
            {weather && <WeatherCard weather={weather} />}
          </div>

          {/* Right Side */}
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