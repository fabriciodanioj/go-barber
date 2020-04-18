import 'reflect-metadata';
  
import express, { json } from 'express';

import './database';

import 'dotenv/config';

import routes from './routes';

const PORT = process.env.PORT || 3333;

const app = express();

app.use(json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
