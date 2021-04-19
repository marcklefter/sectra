import express from 'express';
import cors from 'cors'

import {
  routes
} from './routes';

// ...

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log('API server @ http://localhost:3000')
});