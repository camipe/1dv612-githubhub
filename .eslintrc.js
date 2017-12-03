// http://eslint.org/docs/user-guide/configuring

module.exports = {
  "extends": "airbnb-base",
  "plugins": [
      "import"
  ],
  "rules": {
      "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
      "no-param-reassign": ["error", {
          "props": true,
          "ignorePropertyModificationsFor": ["err", "res", "req"]
      }],
      "no-underscore-dangle": ["error", { "allow": ["_id"] }]
  }
};