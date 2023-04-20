module.exports = {
  extends: "@shieldpay/eslint-config-backend",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.linting.json"],
  },
  rules: {
    "@shieldpay/use-optimus-events/use-optimus-events": 2,
  },
};
