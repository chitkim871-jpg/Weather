import { useState } from "react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!city.trim()) return;

    onSearch(city);
    setCity("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 mb-8"
    >
      <input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 p-3 rounded-xl border-white/50 border-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-white bg-transparent hover:bg-white/10 transition-colors"
      />

      <button
        className="bg-blue-500 text-white px-5 rounded-xl hover:bg-blue-900  transition-colors"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;