import config from "config";

export default {
  origin: (
    origin: unknown,
    callback: (arg0: Error | null, arg1?: boolean) => void
  ): void => {
    if (
      !origin ||
      config.get<string[]>("allowedOrigins").indexOf(origin) !== -1
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
