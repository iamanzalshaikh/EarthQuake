import express from 'express';
import cors from 'cors';
import earthquakeRoutes from './routes/earthquakeRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/earthquakes', earthquakeRoutes);
app.use('/api/health', healthRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🌍 Earthquake Visualizer API running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔍 Earthquakes endpoint: http://localhost:${PORT}/api/earthquakes`);
});
