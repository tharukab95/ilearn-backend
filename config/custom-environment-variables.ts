export default {
  server: {
    port: "SERVER_PORT",
    env: "NODE_ENV",
  },
  mongo: { dbUri: "DATABASE_URI" },
  stripe: {
    publishableKey: "STRIPE_PUBLISHABLE_KEY",
    secretKey: "STRIPE_SECRET_KEY",
    webhookSecret: "STRIPE_WEBHOOK_SECRET",
  },
  auth: {
    accessTokenSecret: "ACCESS_TOKEN_SECRET",
    refreshTokenSecret: "REFRESH_TOKEN_SECRET",
  },
  zoom: {
    apiKey: "ZOOM_API_KEY",
    apiSecret: "ZOOM_API_KEY",
    jwtToken: "ZOOM_JWT_TOKEN",
    webhookToken: "ZOOM_WEBHOOK_TOKEN",
    cientId: "ZOOM_CLIENT_ID",
    cientSecret: "ZOOM_CLIENT_SECRET",
  },
};
