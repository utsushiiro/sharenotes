// ref: https://jestjs.io/docs/ja/configuration
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>src/jest.setup.js"],
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  testMatch: ["**/*.test.ts"]
};
