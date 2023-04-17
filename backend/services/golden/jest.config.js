const { extendBase } = require("@shieldpay/backend-testing");

module.exports = extendBase({
  testEnvironment: "node",
  coveragePathIgnorePatterns: ["/test-helpers.ts"],
  setupFiles: ["<rootDir>/.jest/env.js"],
  testEnvironment: "node",
});
