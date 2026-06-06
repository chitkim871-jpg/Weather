import { useState } from "react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const cities = [
    "Phnom Penh",
    "Banteay Meanchey",
    "Battambang",
    "Kampong Cham",
    "Kampong Chhnang",
    "Kampong Speu",
    "Kampong Thom",
    "Kampot",
    "Kandal",
    "Kep",
    "Koh Kong",
    "Kratie",
    "Mondulkiri",
    "Oddar Meanchey",
    "Pailin",
    "Preah Sihanouk",
    "Preah Vihear",
    "Prey Veng",
    "Pursat",
    "Ratanakiri",
    "Siem Reap",
    "Stung Treng",
    "Svay Rieng",
    "Takeo",
    "Tbong Khmum",
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    setCity(value);

    if (value.length > 0) {
      const filtered = cities.filter((c) =>
        c.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (selectedCity) => {
    setCity(selectedCity);
    setSuggestions([]);
    onSearch(selectedCity);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!city.trim()) return;

    onSearch(city);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={handleChange}
          className="flex-1 p-3 rounded-xl border-white/50 border-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-white bg-transparent placeholder-white/70"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-5 rounded-xl hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </form>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 bg-black/80 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden">
          {suggestions.slice(0, 5).map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className="px-4 py-3 text-white cursor-pointer hover:bg-white/10 transition-colors"
            >
              📍 {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;