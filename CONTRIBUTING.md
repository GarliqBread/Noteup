# Contribution Guidelines

This is an open source project, and contributions are welcomed and appreciated. Open issues, bugs, and enhancements are all listed on the [issues](https://github.com/elements/noteup/issues) tab and labeled accordingly.

## Issues

If you encounter a bug, please file a bug report. If you have a feature to request, please open a feature request. If you would like to work on an issue or feature, there is no need to request permission. Please add tests to any new features.

## Pull Requests

In order to create a pull request for Noteup, follow the GitHub instructions for [Creating a pull request from a fork](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork).

## Folder Structure

Description of the project files and directories.

```bash
├── config/                    # Configuration
│   ├── cypress.config.js      # Cypress end-to-end test configuration
│   ├── jest.config.js         # Jest unit/component test configuration
│   ├── nodemon.config.json    # Nodemon configuration
│   ├── webpack.common.js      # Webpack shared configuration
│   ├── webpack.dev.js         # Webpack development configuration (dev server)
│   └── webpack.prod.js        # Webpack productuon configuration (dist output)
├── assets/                    # Supplemental assets
├── public/                    # Files that will write to dist on build
├── src/                       # All Noteup app source files
│   ├── components/            # React components
│   ├── recoil/                # Recoil atoms and selectors
│   ├── styles/                # Styled-components theme files
│   ├── utils/                 # Utility functions
│   ├── views/                 # App views/pages
│   └── index.tsx              # App entry point
├── src-tauri/
│   ├── icons/                 # Tauri bundle icons
│   ├── src/                   # Tauri main rust file
│   ├── build.rs               # Tauri build scripts
│   └── tauri.conf.json        # Tauri build config
├── .eslintignore              # Files ignored by ESLint
├── .eslintrc                  # Code convention enforced by ESLint
├── .gitignore                 # Files ignored by git
├── .prettierrc                # Code convention enforced by Prettier
├── index.html                 # Main HTML File
├── CHANGELOG.md               # List of significant changes
├── LICENSE                    # License for this open source project
├── package.json               # Dependencies and additional information
├── README.md
└── tsconfig.json              # Typescript configuration
└── vite.config.ts             # Vite configuration
└── yarn.lock              # Package lockfile
```

## Scripts

An explanation of the `package.json` scripts.

| Command       | Description                              |
| ------------- | ---------------------------------------- |
| `build`       | Create a production build of Noteup      |
| `start`       | Run Noteup in a testing environment      |
| `format`      | Run prettier on all the project's files  |
| `lint`        | Run ESlint on all the project's files    |
| `postinstall` | Run post-install package patches         |
| `test`        | Run unit and component tests             |
| `test:e2e`    | Run end-to-end tests in the command line |

## Technologies

This project is possible thanks to all these open source languages, libraries, and frameworks.

| Tech                                                | Description                               |
| --------------------------------------------------- | ----------------------------------------- |
| [Codemirror](https://codemirror.net/)               | Browser-based text editor                 |
| [TypeScript](https://www.typescriptlang.org/)       | Static type-checking programming language |
| [React](https://reactjs.org/)                       | Front end user interface                  |
| [Recoil](https://recoiljs.org/)                     | Global state management                   |
| [Vite](https://vitejs.dev/)                         | Dev server and build tool                 |
| [Styled-components](https://styled-components.com/) | JavaScript styling                        |
| [ESLint](https://eslint.org/)                       | TypeScript linting                        |
| [Jest](https://jestjs.io/)                          | Unit testing framework                    |
| [Cypress](https://www.cypress.io/)                  | End-to-end testing framework              |

## Styleguide

Coding conventions are enforced by [ESLint](.eslintrc.js) and [Prettier](.prettierrc).

- Trailing semicolons
- Double quotes
- Two space indentation
- Trailing commas in arrays and objects
- [Non-default exports](https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/) are preferred for components
- Module imports are ordered and separated: **built-in** -> **external** -> **internal**
- TypeScript: strict mode, with no implicitly any
- React: functional style with Hooks (no classes)
- `const` preferred over `let`
