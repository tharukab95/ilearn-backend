import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import logger from "../utils/logger";

const schemaValidator = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body, query: req.query, params: req.params });
      next();
    } catch (err: any) {
      logger.error(err.errors);
      return res.status(400).json(err.errors);
    }
  };
};

export default schemaValidator;
