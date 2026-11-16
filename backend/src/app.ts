import cors from 'cors';
import express, { Request, Response } from 'express';
import { isDbConnected } from './config/db';
import { errorMiddleware } from './middleware/error.middleware';
import { AppError } from './utils/AppError';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_req: Request, res: Response) => {
    const database = isDbConnected() ? 'connected' : 'disconnected';

    res.status(database === 'connected' ? 200 : 503).json({
      status: database === 'connected' ? 'ok' : 'degraded',
      api: 'up',
      database,
    });
  });

  app.use((req, _res, next) => {
    next(new AppError(`Cannot ${req.method} ${req.path}`, 404));
  });

  app.use(errorMiddleware);

  return app;
}
