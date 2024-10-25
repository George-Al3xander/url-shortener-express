import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
    {
        rules: {
            "@typescript-eslint/explicit-function-return-type": "error",

            // note you must disable the base rule
            // as it can report incorrect errors
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn", // or "error"
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
        },
    },
    { ignores: ["dist"] },
    { files: ["**/*.{js,mjs,cjs,ts}"] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];
