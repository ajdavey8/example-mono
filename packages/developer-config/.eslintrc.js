module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    project: ["./tsconfig.linting.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: [
    "@typescript-eslint",
    "jest",
    "import",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:jest/recommended",
    "prettier",
  ],
  ignorePatterns: [
    ".eslintrc.js",
    "jest.config.ts",
    "prettier.config.js",
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-ignore": "allow-with-description",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_" }],
    "@typescript-eslint/require-await": "off",
    "eol-last": ["error", "always"],
    "jest/no-disabled-tests": "error",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/no-alias-methods": "warn",
    "no-var": "error",
    "prefer-arrow-callback": "off",
    "prefer-const": "error",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "no-restricted-imports": [
      "error",
      {
        patterns: ["dist"],
      },
    ],
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "parent",
          "internal",
          "sibling",
          "index",
          "object",
        ],
        pathGroups: [
          {
            pattern: "@shieldpay/**",
            group: "external",
            position: "after",
          },
          {
            pattern: "data-access/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "support/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "api/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "foundation/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "logic/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "models/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "services/**",
            group: "internal",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["@shieldpay"],
      },
    ],
    curly: "error",
  },
  settings: {
    jest: {
      version: 29,
    },
  },
};
