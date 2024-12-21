import { predictClassification } from "../services/inference.mjs";
import { addPrediction, getAllPredictions } from "../services/db.mjs";

export const postPredictHandler = async (req, res) => {
    try {
        const image = req.file;
        const model = req.model;

        if (image.size > 1000000) {
            const newError = new Error('Payload content length greater than maximum allowed: 1000000');
            newError.statusCode = 413;
            throw newError;
        }

        const { result, suggestion } = await predictClassification(model, image);
        
        await addPrediction({ result, suggestion });

        res.status(200).json({
            status: 'success',
            message: 'Model is predicted successfully',
            data: {
                id: '77bd90fc-c126-4ceb-828d-f048dddff746',
                result,
                suggestion,
                createdAt: new Date().toISOString()
            }
        });
    } catch(error) {
        const statusCode = error.statusCode || 400;

        res.status(statusCode).json({
            status: 'fail',
            message: error.message
        });
    }
};

export const getPredictionHistoryHandler = async (req, res) => {
    const data = await getAllPredictions();

    const formattedData = data.map(prediction => ({
        id: prediction.id,
        history: {
            result: prediction.result,
            createdAt: prediction.createdAt,
            suggestion: prediction.suggestion,
            id: prediction.id,
        }
    }));

    res.status(200).json({
        status: 'success',
        data: formattedData
    });
};