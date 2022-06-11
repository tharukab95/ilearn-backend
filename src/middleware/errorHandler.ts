import { Request, Response } from "express";
import { logEvents } from "./logEvents";

export default function errorHandler(err, req: Request, res: Response) {
  logEvents(`${err.name}: ${err.message}`, "errLog.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
}
