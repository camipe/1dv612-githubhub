module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/strongly-recommended',
    'airbnb-base',
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "no-unused-vars": ["error", { "argsIgnorePattern": ["next", "req"] }],
    "no-param-reassign": ["error", {
        "props": true,
        "ignorePropertyModificationsFor": ["err", "res", "req", "Vue", "options"]
    }],
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
    "no-console": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
  }
}