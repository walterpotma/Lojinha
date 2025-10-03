import express from 'express';
import Routers from './routes/routes.js';
import cors from 'cors';

const app = express();
const port = 3200;

app.use(cors(
    {
        origin: 'http://127.0.0.1:5500'
    }
));

app.use(express.json());
app.use('/api/v1', Routers);


app.listen(port, () => {
    console.log(`Servidor backend rodando em http://host:${port}`);
});