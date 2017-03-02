module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "no-param-reassign": ["error", { "props": false }],
      "global-require": "off",
    },
    "env": {
      "browser": true,
      "node": true,
    },
    "globals": {
      "test": true,
      "expect": true,
    }
};
