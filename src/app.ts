import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import productRouter from './app/modules/product/product.routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', productRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Bike Shop Server!');
});

export default app;
