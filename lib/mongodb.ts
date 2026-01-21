import mongoose, { Mongoose } from "mongoose";
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

type MongooseCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache =
  globalThis.mongoose ?? (globalThis.mongoose = { conn: null, promise: null });

export async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .catch((err) => {
        cached.promise = null;
        console.error("Mongo connect error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
