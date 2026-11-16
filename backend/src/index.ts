import { createApp } from './app';
import { connectDb } from './config/db';
import { env } from './config/env';

async function start(): Promise<void> {
  const app = createApp();

  try {
    await connectDb();
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed. /api/health will report the database as disconnected.');
    console.error(error);
  }

  app.listen(env.port, () => {
    console.log(`Server is running on http://localhost:${env.port}`);
  });
}

start().catch((error) => {
  console.error('Failed to start server');
  console.error(error);
  process.exit(1);
});
