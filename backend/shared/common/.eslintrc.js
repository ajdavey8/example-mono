module.exports = {
  extends: "@shieldpay/eslint-config-backend",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.linting.json"],
  },
};
