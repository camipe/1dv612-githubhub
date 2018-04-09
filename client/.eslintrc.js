module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    "plugin:vue/recommended",
    'airbnb-base',
  ],
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
    "no-param-reassign": ["error", {
        "props": true,
        "ignorePropertyModificationsFor": ["err", "res", "req", "Vue"]
    }],
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
    "no-console": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
  }
}