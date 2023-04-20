const { extendBase } = require("@shieldpay/backend-testing");

module.exports = extendBase({
  setupFiles: ["<rootDir>/.jest/env.js"],
});
