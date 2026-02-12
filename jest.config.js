module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)": [
      "ts-jest",
      {
        isolatedModules: true,
      },
    ],
  },
  testMatch: ["<rootDir>/src/Tests/UnitTest/**/*.(spec|test).(ts|tsx)"],
  testPathIgnorePatterns: ["<rootDir>/node_modules"],
  transformIgnorePatterns: ["<rootDir>/node_modules"],
  moduleFileExtensions: ["tsx", "ts", "js", "jsx"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/src/Tests/UnitTest/__mocks__/styleMock.js",
  },
};
