module.exports = {
  "extends": ["stylelint-config-standard", "stylelint-config-sass-guidelines", "stylelint-config-clean-order"],
  "plugins": ["stylelint-prettier"],
  "rules": {
    "prettier/prettier": true,
    "declaration-no-important": true,
    "value-keyword-case": ["lower", { "ignoreProperties": ["/^\\--font-family/"] }]
  }
}
