import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from '../server/routes.mjs';
import loadModel from '../services/load-model.mjs';

const app = express();

const port = process.env.PORT;
const model = await loadModel();
const frontend_url = process.env.FRONTEND_URL;

app.set('port', port);

// app.use(cors({
//     origin: frontend_url,
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type'],
// }));
app.use(cors());
app.use((req, res, next) => {
    req.model = model;
    next();
});
app.use(routes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${ port }`);
});