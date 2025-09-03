import React from "react";

export default function Legend() {
  return (
    <div className="bg-white shadow p-3 rounded text-sm">
      <p className="font-bold mb-2">Magnitude Scale</p>
      <p className="text-green-600">🟢 Low (&lt;3.0)</p>
      <p className="text-orange-600">🟠 Moderate (3.0–5.0)</p>
      <p className="text-red-600">🔴 Strong (&gt;5.0)</p>
      <p className="text-xs text-gray-500 mt-2">Updates every 5 min</p>
    </div>
  );
}
