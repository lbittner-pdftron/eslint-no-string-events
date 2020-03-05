# eslint-plugin-no-string-events

Disallows accessing event with string literals

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-no-string-events`:

```
$ npm install eslint-plugin-no-string-events --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-no-string-events` globally.

## Usage

Add `no-string-events` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "no-string-events"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "no-string-events/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





