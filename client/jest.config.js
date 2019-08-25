// ref: https://jestjs.io/docs/ja/configuration
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    },
    "CONFIG_TYPE": "jest" // used in config/index.ts
  },
  testMatch: ["**/*.test.ts"]
};
