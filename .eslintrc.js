module.exports = {
    extends: [
      "airbnb-base",
      "plugin:prettier/recommended",
      "prettier/react",
      "plugin:react/recommended"
    ],
    plugins: ["prettier"],
    rules: {
      "prettier/prettier": ["error"],
      "camelcase": [0],
      "no-restricted-syntax": [0],
      "consistent-return": [1] // temporary
    },
    settings: {
      react: {
        version: "16.7.0"
      }
    }
  };