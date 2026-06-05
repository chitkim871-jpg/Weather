function ForecastCard({ forecast }) {
  const getTempColor = (temp) => {
    if (temp <= 10) return "from-blue-700 via-blue-500";
    if (temp <= 20) return "from-sky-500 via-cyan-400";
    if (temp <= 30) return "from-yellow-400 via-orange-400";
    return "from-yellow-500 via-red-500";
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {forecast.map((day, index) => {
        const temp = Math.round(day.main.temp);

        return (
          <div
            key={index}
            className={`bg-white/20 backdrop-blur-lg border border-white/30 bg-linear-to-r ${getTempColor(
              temp
            )} rounded-2xl p-4 text-center text-white`}
          >
            <h3 className="font-semibold mb-2">
              {new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </h3>

            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt=""
              className="mx-auto w-16 h-16"
            />

            <h2 className="text-xl md:text-2xl font-bold">{temp}°C</h2>

            <p className="text-xs md:text-sm capitalize">
              {day.weather[0].description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default ForecastCard;