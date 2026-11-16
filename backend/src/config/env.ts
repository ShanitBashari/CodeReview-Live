import dotenv from 'dotenv';

dotenv.config();

function readPort(): number {
  const raw = process.env.PORT ?? '5000';
  const port = Number(raw);

  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error(`PORT must be an integer between 1 and 65535. Received: ${raw}`);
  }

  return port;
}

const nodeEnv = process.env.NODE_ENV ?? 'development';

export const env = {
  nodeEnv,
  isProduction: nodeEnv === 'production',
  port: readPort(),
  mongodbUri: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/codereview-live',
};
