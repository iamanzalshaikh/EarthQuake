export function filterEarthquakes(earthquakes, magnitude) {
  if (magnitude === 'all') return earthquakes;

  return earthquakes.filter(eq => {
    const mag = eq.properties.mag;
    if (magnitude === 'low') return mag < 3;
    if (magnitude === 'moderate') return mag >= 3 && mag <= 5;
    if (magnitude === 'strong') return mag > 5;
    return true;
  });
}
