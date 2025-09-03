import React from "react";
import { EarthquakeProvider } from "./context/EarthquakeContext";
import Header from "./components/Header";
import MapView from "./components/MapView";
import FilterControls from "./components/FilterControls";
import Legend from "./components/Legend";
import "leaflet/dist/leaflet.css";

// ✅ API URL defined here
export const serverUrl = "https://earthquake-backend-rga2.onrender.com";

function App() {
  return (
    <EarthquakeProvider>
      <div className="h-screen flex flex-col bg-gray-100">
        {/* Header */}
        <Header />

        {/* Map + Overlays */}
        <div className="flex-1 relative">
          <MapView />

          {/* Floating controls (always on top) */}
          <div className="absolute top-4 right-4 space-y-3 w-60 z-[9999]">
            <FilterControls />
            <Legend />
          </div>
        </div>
      </div>
    </EarthquakeProvider>
  );
}

export default App;
