function HourlyForecast({ forecast }) {
    return (
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5">
            {/* <h2 className="text-white text-2xl font-bold mb-4">
                Hourly Forecast
            </h2> */}

            <div className="flex gap-4 overflow-x-auto pb-2">
                {forecast.map((item, index) => (
                    <div
                        key={index}
                        className="min-w-35 bg-white/10 rounded-2xl p-4 text-center shrink-0"
                    >
                        <p className="text-white font-semibold">
                            {index === 0
                                ? "Now"
                                : new Date(item.dt * 1000).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                })}
                        </p>

                        <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                            alt={item.weather[0].description}
                            className="mx-auto"
                        />

                        <h3 className="text-white text-xl font-bold">
                            {Math.round(item.main.temp)}°C
                        </h3>

                        <p className="text-white/80 text-sm">
                            {item.weather[0].main}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HourlyForecast;