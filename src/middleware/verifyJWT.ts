import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type NewRequest = Request & {
  user: string;
  roles: string[];
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const verifyJWT = (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  // const authHeader = req.headers.authorization || req.headers.Authorization;
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};
