import express from 'express';
import Routers from './routes/routes.js';

const app = express();
const port = 3200;

app.use(express.json());
app.use('/api/v1', Routers);

app.listen(port, () => {
    console.log(`Servidor backend rodando em http://host:${port}`);
});