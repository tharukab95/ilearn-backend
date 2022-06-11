import dotenv from "dotenv";

dotenv.config();

const ROLES_LIST = {
  Admin: 5150,
  Editor: 1984,
  User: 2001,
};

const CORS_ALLOWED_ORIGINS = ["http://localhost:3000", "https://nxgep.com"];

const DATABASE_URI = process.env.DATABASE_URI || "";

const SERVER_OPTIONS = {
  port: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3500,
  env: process.env.NODE_ENV || "production",
};

const ZOOM_CONFIGS = {
  APIKey: process.env.ZOOM_API_KEY,
  APISecret: process.env.ZOOM_API_KEY,
  JwtToken: process.env.ZOOM_JWT_TOKEN,
};

export default {
  mongo: { uri: DATABASE_URI },
  server: SERVER_OPTIONS,
  cors: {
    allowedOrigins: CORS_ALLOWED_ORIGINS,
  },
  userRoles: ROLES_LIST,
  zoom: ZOOM_CONFIGS,
};
