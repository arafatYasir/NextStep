import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = "next-step";

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = (global as any).mongo;

if (!cached) {
    cached = (global as any).mongo = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {};

        cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
            console.log("-------- Database Connected --------");
            return {
                client,
                db: client.db(MONGODB_DB),
            };
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}