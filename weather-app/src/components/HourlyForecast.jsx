import weatherImages from "../data/weatherImages";

function HourlyForecast({ forecast }) {
  const getWeatherImage = (condition) => {
    return weatherImages[condition] || weatherImages.Clear;
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/20 shadow-xl">
      <div className="flex gap-4 overflow-x-auto pb-2">
        {forecast.map((item, index) => {
          const temp = Math.round(item.main.temp);
          const condition = item.weather[0].main;

          return (
            <div
              key={index}
              className="relative min-w-35 shrink-0 overflow-hidden rounded-2xl border border-white/20 shadow-lg"
            >
              {/* Background Image */}
              <img
                src={getWeatherImage(condition)}
                alt={condition}
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Content */}
              <div className="relative z-10 p-4 text-center text-white">
                <p className="font-semibold">
                  {index === 0
                    ? "Now"
                    : new Date(item.dt * 1000).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                </p>

                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                  className="mx-auto w-16 h-16"
                />

                <h3 className="text-2xl font-bold">
                  {temp}°C
                </h3>

                <p className="text-sm text-white/90">
                  {item.weather[0].main}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HourlyForecast;