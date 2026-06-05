function HourlyForecast({ forecast }) {
    const getTempColor = (temp) => {
        if (temp <= 10) return "from-blue-700 via-blue-500";
        if (temp <= 20) return "from-sky-500 via-cyan-400";
        if (temp <= 30) return "from-yellow-400 via-orange-400";
        return "from-yellow-500 via-red-500";
    };

    return (
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5">
            <div className="flex gap-4 overflow-x-auto pb-2">
                {forecast.map((item, index) => {
                    const temp = Math.round(item.main.temp);

                    return (
                        <div
                            key={index}
                            className={`min-w-35 shrink-0 rounded-2xl p-4 text-center bg-linear-to-r ${getTempColor(
                                temp
                            )} text-white`}
                        >
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
                                className="mx-auto"
                            />

                            <h3 className="text-xl font-bold">
                                {temp}°C
                            </h3>

                            <p className="text-sm text-white/90">
                                {item.weather[0].main}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default HourlyForecast;