import 'dotenv/config';
import express from 'express';
import routes from '../server/routes.mjs';
import loadModel from '../services/load-model.mjs';

const app = express();

const port = process.env.PORT;
const model = await loadModel();

app.set('port', port);
app.set('model', model);

app.use(routes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${ port }`);
});