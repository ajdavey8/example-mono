
import type {Config} from 'jest';

const config: Config = {
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        diagnostics: false,
        isolatedModules: true,
      },
    ],
  },
  modulePathIgnorePatterns: ["__factories__"],
  coveragePathIgnorePatterns: [
    "__factories__",
  ],
  moduleDirectories: ["node_modules", "src"]
};

export default config;
