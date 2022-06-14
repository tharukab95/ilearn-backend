import { connect, ConnectOptions } from "mongoose";
import config from "config";

export async function connectMongodb(): Promise<void> {
  const dbUri = config.get("mongo.dbUri");
  try {
    await connect(dbUri, {
      retryWrites: true,
      w: "majority",
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as ConnectOptions);
    console.log("connected to mongodb");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
