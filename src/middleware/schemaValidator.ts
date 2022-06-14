import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import logger from "../utils/logger";

const schemaValidator = (schema: ObjectSchema) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (err: any) {
      logger.error(err.message);
      return res.status(500).json(err.message);
    }
  };
};

export default schemaValidator;
