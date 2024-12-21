import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from '../server/routes.mjs';
import loadModel from '../services/load-model.mjs';

const app = express();

const port = process.env.PORT;
const model = await loadModel();
const frontend_url = process.env.FRONTEND_URL;

const corsOptions = {
    origin: frontend_url,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

app.set('port', port);
app.set('model', model);

app.use(routes);
app.use(cors(corsOptions));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${ port }`);
});