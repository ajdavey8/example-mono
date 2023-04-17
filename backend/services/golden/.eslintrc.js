module.exports = {
  extends: "@shieldpay/eslint-config-backend",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.linting.json"],
  },
  rules: {
    "jest/expect-expect": [
      "error",
      { assertFunctionNames: ["template.hasResourceProperties", "expect"] },
    ],
  },
};
