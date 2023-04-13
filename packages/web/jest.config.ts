import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  rootDir: "./",
  roots: ["<rootDir>/src/tests/unit"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        diagnostics: false,
      },
    ],
    "\\.(html|xml|txt|md)$": "jest-raw-loader",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom", "jest-extended"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1",
    "@noteup/shared/(.*)$": "<rootDir>/../shared/src/$1",
  },
};

export default config;
