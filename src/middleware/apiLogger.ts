import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

const apiLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(
    `${req.method}\t${req.headers.origin || req.headers.host}\t${req.url}`
  );
  next();
};

export default apiLogger;
