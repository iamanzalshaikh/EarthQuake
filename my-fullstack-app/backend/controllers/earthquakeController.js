import axios from 'axios';
import { filterEarthquakes } from '../utils/filterUtils.js';

const USGS_API_URL =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

export async function getEarthquakes(req, res) {
  try {
    const { magnitude = 'all' } = req.query;
    console.log(`Fetching earthquakes with magnitude filter: ${magnitude}`);

    const response = await axios.get(USGS_API_URL);
    const data = response.data;

    const filtered = filterEarthquakes(data.features, magnitude);

    res.json({
      ...data,
      features: filtered,
      metadata: {
        ...data.metadata,
        count: filtered.length,
        filtered: magnitude !== 'all',
      },
    });
  } catch (err) {
    console.error('Error fetching earthquake data:', err.message);
    res.status(500).json({
      error: 'Failed to fetch earthquake data',
      message: err.message,
    });
  }
}
