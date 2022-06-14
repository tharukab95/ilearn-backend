import { connect, ConnectOptions } from "mongoose";
import config from "config";
import logger from "../utils/logger";

export async function connectMongodb(): Promise<void> {
  const dbUri = config.get("mongo.dbUri");
  try {
    await connect(dbUri, {
      retryWrites: true,
      w: "majority",
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as ConnectOptions);
    logger.info("Connected to database");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
