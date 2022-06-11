var jsonwebtoken = require("jsonwebtoken");
var uuid = require("uuid-random");

/**
 * Function generates a JaaS JWT.
 */
const generate = (privateKey, { id, name, email, avatar, appId, kid }) => {
  const now = new Date();
  const jwt = jsonwebtoken.sign(
    {
      aud: "jitsi",
      iss: "chat",
      exp: Math.round(now.setHours(now.getHours() + 2) / 1000),
      nbf: Math.round(new Date().getTime() / 1000) - 6,
      sub: appId,
      context: {
        features: {
          livestreaming: true,
          "outbound-call": true,
          "sip-outbound-call": false,
          transcription: true,
          recording: true,
        },
        user: {
          moderator: true,
          name,
          id,
          avatar,
          email: "tharukabandara95@gmail.com",
        },
      },
      room: "*",
    },
    privateKey,
    { algorithm: "RS256", header: { kid } }
  );
  return jwt;
};

/**
 * Generate a new JWT.
 */
// const token = generate("my private key", {
//   id: uuid(),
//   name: "my user name",
//   email: "my user email",
//   avatar: "my avatar url",
//   appId: "my AppID", // Your AppID ( previously tenant )
//   kid: "my api key",
// });

// console.log(token);

module.exports = generate;
