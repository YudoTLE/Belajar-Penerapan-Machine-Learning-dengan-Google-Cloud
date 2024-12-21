import express from 'express';
import { upload } from '../middlewares/multer.mjs';
import { postPredictHandler, getPredictionHistoryHandler } from '../server/handler.mjs';

const routes = express.Router();

routes.post('/predict', upload.single('image'), postPredictHandler);

routes.get('/predict/histories', getPredictionHistoryHandler);

export default routes;