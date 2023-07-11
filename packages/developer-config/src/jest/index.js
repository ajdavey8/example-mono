/**
 * Passed in a config object it will extend that object. Previously we would not
 * deep merge the config, and therefore we had some issues with coverage.
 *
 * @returns
 */
const extendBase = (config = {}) => {
    const {
      modulePathIgnorePatterns = [],
      coveragePathIgnorePatterns = [],
      moduleDirectories = [],
      ...rest
    } = config;
  
    return {
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
      modulePathIgnorePatterns: ["__factories__", ...modulePathIgnorePatterns],
      coveragePathIgnorePatterns: [
        "__factories__",
        ...coveragePathIgnorePatterns,
      ],
      moduleDirectories: ["node_modules", "src", ...moduleDirectories],
      ...rest,
    };
  };
  
  module.exports = {
    extendBase,
  };
  