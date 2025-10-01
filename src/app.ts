import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';
import routes from './routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
