/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    // Path alias — mirrors tsconfig paths
    "^@/(.*)$": "<rootDir>/src/$1",
    // Stub out CSS / image imports that break in Node
    "\\.(css|scss|sass)$": "<rootDir>/src/__tests__/__mocks__/style.js",
    "\\.(png|jpg|jpeg|gif|svg|ico|webp)$": "<rootDir>/src/__tests__/__mocks__/file.js",
  },
  transform: {
    "^.+\\.(t|j)sx?$": [
      "ts-jest",
      {
        // Node module resolution is required by ts-jest (not "bundler")
        tsconfig: "<rootDir>/tsconfig.jest.json",
        diagnostics: { ignoreCodes: ["TS151001"] },
      },
    ],
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/__tests__/**/*.test.(ts|tsx)"],
};

module.exports = config;
