import express from 'express';
import { upload } from '../middlewares/multer.mjs';
import { postPredictHandler, getPredictionHistoryHandler } from '../server/handler.mjs';

const routes = express.Router();

routes.post('/predict', upload.single('file'), postPredictHandler);

routes.get('/predict/history', getPredictionHistoryHandler);

export default routes;