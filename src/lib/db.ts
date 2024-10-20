import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
  }
  client = globalWithMongo._mongoClient;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
}

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default client;

// DB Connection
// Global cache for Mongoose connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    console.log("DB Connection exists.!");
    return cached.conn; // Returning existing connection
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    // Createing connection promise and caching it
    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    // Await the promise and store the connection
    cached.conn = await cached.promise;
  } catch (e) {
    // Reseting the promise if connection fails.
    cached.promise = null;
    throw e;
  }

  return cached.conn; // Returning the successful connection
}

// bufferCommands: false: Prevents buffering MongoDB operations when Mongoose isn't connected. If the connection is lost, Mongoose won't queue up database operations.

// Connection Reuse: If the connection is already established, it returns the existing one. This is ideal for minimizing the overhead of multiple connections, especially during development
