let clientPromise: Promise<import("mongodb").MongoClient> | null = null;

export async function getDb(): Promise<import("mongodb").Db | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  const { MongoClient } = await import("mongodb");
  if (!clientPromise) {
    clientPromise = Promise.resolve(new MongoClient(uri).connect());
  }
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB ?? "acetech");
}
