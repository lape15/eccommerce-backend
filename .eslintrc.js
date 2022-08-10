module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends":[ "prettier", "airbnb-base", "eslint:recommended"],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "prettier"
      ],
    "rules": {
    "prettier/prettier": "error"
    }
}
