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
      "no-restricted-syntax": [0],
      "consistent-return": [1],
      "no-underscore-dangle": [1]
    },
    settings: {
      react: {
        version: "16.7.0"
      }
    }
  };