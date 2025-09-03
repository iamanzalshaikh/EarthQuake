import React from "react";
import { useEarthquake } from "../context/EarthquakeContext";

export default function Header() {
  const { totalCount, loading, fetchEarthquakes, filter } = useEarthquake();

  return (
    <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <h1 className="text-lg font-bold">🌍 Earthquake Visualizer</h1>
      <div className="flex items-center space-x-3">
        <span className="text-sm">{totalCount} Events (24h)</span>
        <button
          onClick={() => fetchEarthquakes(filter)}
          disabled={loading}
          className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {loading ? "Updating..." : "Refresh"}
        </button>
      </div>
    </header>
  );
}
