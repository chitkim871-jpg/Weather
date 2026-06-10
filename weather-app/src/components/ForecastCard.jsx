function ForecastCard({ forecast }) {
  const getWeatherImage = (condition) => {
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
    };

    return images[condition] || images.Clear;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {forecast.map((day, index) => {
        const temp = Math.round(day.main.temp);
        const condition = day.weather[0].main;

        return (
          <div
            key={index}
            className="relative overflow-hidden border-2 border-blue-600 rounded-2xl p-4 text-center text-white shadow-2xs"
          >
            {/* Background Image */}
            <img
              src={getWeatherImage(condition)}
              alt={condition}
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0" />

            {/* Content */}
            <div className="relative z-10">
              <h3 className="font-semibold mb-2">
                {new Date(day.dt_txt).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </h3>

              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="mx-auto w-16 h-16"
              />

              <h2 className="text-xl md:text-2xl font-bold">
                {temp}°C
              </h2>

              <p className="text-xs md:text-sm capitalize">
                {day.weather[0].description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ForecastCard;