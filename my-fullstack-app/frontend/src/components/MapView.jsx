import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEarthquake } from "../context/EarthquakeContext";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function getIcon(mag) {
  let color = "green";
  if (mag >= 3 && mag <= 5) color = "orange";
  if (mag > 5) color = "red";
  return L.divIcon({
    html: `<div style="background:${color};width:14px;height:14px;border-radius:50%;border:2px solid white"></div>`,
  });
}

export default function MapView() {
  const { earthquakes, loading, error } = useEarthquake();

  if (loading) return <div className="flex items-center justify-center h-full">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-full text-red-600">{error}</div>;

  return (
    <MapContainer center={[20, 0]} zoom={2} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {earthquakes.map((e) => {
        const [lng, lat, depth] = e.geometry.coordinates;
        return (
          <Marker key={e.id} position={[lat, lng]} icon={getIcon(e.properties.mag)}>
            <Popup>
              <b>{e.properties.title}</b>
              <br />Mag: {e.properties.mag}
              <br />Depth: {depth.toFixed(1)} km
              <br />{new Date(e.properties.time).toLocaleString()}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
