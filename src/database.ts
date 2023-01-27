import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { getEnv } from './utils/core';

dotenv.config();

export function connectDatabase(URL?: string, options?: any) {
  const MONGO_URL = getEnv({ name: 'MONGO_URL', defaultValue: '' });

  const connectionOptions: mongoose.ConnectOptions = {
    autoCreate: true,
    autoIndex: true,
    family: 4,
    minPoolSize: 10,
    maxPoolSize: 100,
  }

  try {
    mongoose.set('strictQuery', false);

    mongoose.connect(URL || MONGO_URL, {
      ...connectionOptions,
      ...(options || { minPoolSize: 10, maxPoolSize: 100 }),
    })

    console.log(`[arctis-api] Connected to the database`);
  } catch(error) {
    console.log(`Database connection error`, error);
  }
}

export async function closeDatabase() {
  try {
    await mongoose.connection.close();
    console.log('[arctis-api] Mongoose connection closed');
  } catch(e) {
    console.error(e);
  }
}

/**
 * Health check
 */
export function status() {
  return new Promise(function(resolve, reject) {
    mongoose.connection.db.admin().ping((err, result) => {
      if (err)
        return reject(err);
      
      return resolve(result);
    })
  })
}
