import { Firestore } from '@google-cloud/firestore';

export const addPrediction = async (data) => {
    const db = new Firestore();

    const ref = await db.collection('predictions').add({
        ...data,
        createdAt: new Date().toISOString()
    });
    await ref.update({ id: ref.id });
    return (await ref.get()).data();
};

export const getAllPredictions = async () => {
    const db = new Firestore();

    const query = await db.collection('predictions').get();
    return query.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}