import { useState, useEffect } from "react";

function DateTime() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-5">
      <div className=" backdrop-blur-1xl  p-3 text-center text-white">
        
        <h1 className="text-1xl font-bold tracking-wider">
          {dateTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </h1>

        <p className="mt-1 text-1xl text-white/90">
          {dateTime.toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <div className="mt-1 inline-block px-2 py-1 rounded-full bg-white/20 border border-white/30">
          <span className="text-sm text-1xl font-medium">
            Phnom Penh, Cambodia 🇰🇭
          </span>
        </div>

      </div>
    </div>
  );
}

export default DateTime;