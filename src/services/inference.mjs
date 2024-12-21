import tf from '@tensorflow/tfjs-node';

export const predictClassification = async (model, image) => {
    try {
        const tensor = tf.node
            .decodeJpeg(image.buffer)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;

        let result, suggestion;
        if (confidenceScore <= 50) {
            result = 'Non-cancer';
            suggestion = 'Penyakit kanker tidak terdeteksi.';
        } else {
            result = 'Cancer';
            suggestion = 'Segera periksa ke dokter!';
        }

        return { result, suggestion };
    } catch(error) {
        throw new Error('Terjadi kesalahan dalam melakukan prediksi');
    }
};