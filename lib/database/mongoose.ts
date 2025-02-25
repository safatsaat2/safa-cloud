import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// TypeScript-safe way to store in global scope
const globalWithMongoose = global as unknown as { mongoose?: MongooseConnection };

const cached: MongooseConnection = globalWithMongoose.mongoose ?? {
  conn: null,
  promise: null,
};

// Ensure global.mongoose is set
globalWithMongoose.mongoose = cached;

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URL) throw new Error("Missing MONGODB_URL");

  cached.promise ??= mongoose.connect(MONGODB_URL, {
    dbName: "safa-cloud",
    bufferCommands: false,
  });

  cached.conn = await cached.promise;
  return cached.conn;
};
