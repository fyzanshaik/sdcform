import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Optionally, disable noisy rules globally
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-this-alias": "off",
      // Uncomment below if you want to disable these everywhere
      // "@typescript-eslint/no-explicit-any": "off",
      // "@typescript-eslint/no-empty-object-type": "off",
      // "@typescript-eslint/no-unsafe-function-type": "off",
      // "@typescript-eslint/no-wrapper-object-types": "off",
    },
  },

  // Ignore all generated Prisma files completely (recommended)
  {
    ignores: [
      "lib/generated/prisma/**/*.js",
      "lib/generated/prisma/**/*.d.ts",
      "lib/generated/prisma/**/*.ts",
    ],
  },

  // If you want to lint generated files but silence specific rules:
  {
    files: [
      "lib/generated/prisma/**/*.js",
      "lib/generated/prisma/**/*.d.ts",
      "lib/generated/prisma/**/*.ts",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },

  // Optionally, silence unused eslint-disable comments everywhere
  {
    rules: {
      "no-unused-disable-directive": "off", // Only if you use a plugin that provides this rule
    },
  },
];

export default eslintConfig;
