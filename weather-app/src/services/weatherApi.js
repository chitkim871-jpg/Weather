import axios from "axios";

const API_KEY = "4c71f67d099e10a6589716190455ea1a";

export const getWeather = async (city) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );

  return response.data;
};

export const getForecast = async (city) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
  );

  return response.data.list.filter(
    (item) => item.dt_txt.includes("12:00:00")
  );
};
export const getHourlyForecast = async (city) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
  );

  const now = Date.now();

  return response.data.list
    .filter((item) => item.dt * 1000 >= now)
    .slice(0, 8);
};