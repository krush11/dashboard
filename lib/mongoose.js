import mongoose from 'mongoose';

let { MONGODB_URI, MONGODB_DB } = process.env;
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!MONGODB_URI)
  throw new Error("Please define the MONGODB_URI environment variable inside .env");

if (!cached)
  cached = global.mongoose = { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn)
    return cached.conn;

  if (!cached.promise) {
    /** @type {import('mongoose').ConnectOptions} */
    const opts = { dbName: MONGODB_DB };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;

  return cached.conn;
}
