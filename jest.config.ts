import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  rootDir: "./",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "<rootDir>/coverage",
  collectCoverageFrom: ["<rootDir>/packages/**/src/*.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules"],
  projects: [
    {
      displayName: "Web",
      testEnvironment: "jsdom",
      transform: {
        "^.+\\.tsx?$": [
          "ts-jest",
          {
            diagnostics: false,
          },
        ],
        "\\.(html|xml|txt|md)$": "jest-raw-loader",
      },
      testMatch: ["<rootDir>/packages/web/src/**/*.test.tsx"],
      moduleNameMapper: {
        "@/(.*)$": "<rootDir>/packages/web/src/$1",
        "@noteup/shared/(.*)$": "<rootDir>/packages/shared/src/$1",
      },
      setupFilesAfterEnv: ["@testing-library/jest-dom", "jest-extended"],
    },
    {
      displayName: "Desktop",
      testEnvironment: "jsdom",
      transform: {
        "^.+\\.tsx?$": [
          "ts-jest",
          {
            diagnostics: false,
          },
        ],
        "\\.(html|xml|txt|md)$": "jest-raw-loader",
      },
      testMatch: ["<rootDir>/packages/desktop/src/**/*.test.tsx"],
      moduleNameMapper: {
        "@/(.*)$": "<rootDir>/packages/desktop/src/$1",
        "@noteup/shared/(.*)$": "<rootDir>/packages/shared/src/$1",
      },
      setupFilesAfterEnv: ["@testing-library/jest-dom", "jest-extended"],
    },
  ],
};

export default config;
