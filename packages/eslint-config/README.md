# @shieldpay/eslint-config

A library for backend eslint configs and custom rules.

Install with `yarn add --dev @shielpay/eslint-config`

Install with all eslint peer dependencies `yarn add --dev --peer @shieldpay/eslint-config`

In the root add an `.eslintrc.js`

Add the following to the config file.

```js
module.exports = {
  extends: "@shieldpay/eslint-config",
};
```

## Custom rules

Custom rules are enabled by default but can be overwritten

### handler-capture-exception rule

Checks that capture exception is imported into a lambda handler file. The default rule is to error but this can be modified in the `.eslintrc.js` like so:

```js
{
  rules: {
    "@shieldpay/handler-capture-exception/handler-capture-exception": ["warn"]
  }
}
```
