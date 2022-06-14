import config from "config";
import { NextFunction, Request, Response } from "express";

const credentials = (req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = config.get<string[]>("allowedOrigins");
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true.toString());
  }
  next();
};

export default credentials;
