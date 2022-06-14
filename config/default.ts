export default {
  server: {
    port: 3500,
    env: "production",
  },
  mongo: {
    dbUri:
      "mongodb+srv://ilearnhub-premium:Dragon102824@ilearn-store.3al69.mongodb.net/ilearn",
  },
  stripe: {
    publishableKey: "",
    secretKey: "",
    webhookSecret: "",
  },
  zoom: {
    apiKey: "",
    apiSecret: "",
    jwtToken: "",
    webhookToken: "",
    cientId: "",
    cientSecret: "",
  },
  allowedOrigins: ["http://localhost:3000"],
  baseUri: "http://localhost:3000",
  auth: {
    accessTokenSecret: "",
    refreshTokenSecret: "",
  },
  userRoles: {
    Admin: 5150,
    Editor: 1984,
    User: 2001,
  },
};
