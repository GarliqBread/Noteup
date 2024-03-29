module.exports = {
  tabWidth: 2,
  printWidth: 100,
  singleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  importOrder: [
    "^@/recoil/(.*)$",
    "^@/utils/(.*)$",
    "^@/views/(.*)$",
    "^@/components/(.*)$",
    "^@/assets/(.*)$",
    "^@/styles/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require("@trivago/prettier-plugin-sort-imports")],
};
