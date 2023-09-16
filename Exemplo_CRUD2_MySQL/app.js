import express from 'express'
import { router } from './routers.js';

const app = express();
app.use(express.json());
app.use(router);

app.listen(3000, console.log('Servidor rodando'))