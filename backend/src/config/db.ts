import mongoose from 'mongoose';
import { env } from './env';

export async function connectDb(): Promise<void> {
  await mongoose.connect(env.mongodbUri, {
    serverSelectionTimeoutMS: 5000,
  });
}

export function isDbConnected(): boolean {
  return mongoose.connection.readyState === 1;
}
