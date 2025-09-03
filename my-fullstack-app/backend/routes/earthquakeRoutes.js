import express from 'express';
import { getEarthquakes } from '../controllers/earthquakeController.js';

const router = express.Router();

router.get('/', getEarthquakes);

export default router;
