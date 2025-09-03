import React from "react";
import { useEarthquake } from "../context/EarthquakeContext";

export default function FilterControls() {
  const { filter, setFilter, loading, lastUpdated } = useEarthquake();
    console.log("FilterControls render", { filter, loading, lastUpdated });

  const options = [
    { value: "all", label: "All" },
    { value: "low", label: "Low (<3.0)" },
    { value: "moderate", label: "Moderate (3.0–5.0)" },
    { value: "strong", label: "Strong (>5.0)" },
  ];

  return (
    <div className="bg-white shadow p-3 rounded">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        disabled={loading}
        className="w-full border p-2 rounded"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <p className="text-xs text-gray-500 mt-2">
        Last update: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "Never"}
      </p>
    </div>
  );
}
