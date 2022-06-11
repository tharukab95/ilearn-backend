import { connect, ConnectOptions } from "mongoose";
import config from ".";

export const connectDatabase = async () => {
  try {
    await connect(
      "mongodb+srv://ilearnhub-premium:Dragon102824@ilearn-store.3al69.mongodb.net/ilearn",
      {
        retryWrites: true,
        w: "majority",
        useUnifiedTopology: true,
        useNewUrlParser: true,
      } as ConnectOptions
    );
  } catch (err) {
    console.error(err);
  }
};
