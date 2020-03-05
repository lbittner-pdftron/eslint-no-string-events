# Disallows string literal event names (no-string-events)

## Rule Details

This rule aims to prevent typos when creating/subscribing to events, and also disallows dynamic event names.

Examples of **incorrect** code for this rule:

```js
myClass.on('change', () => {

});
```

```js
const someFunction = (name) => {
  myClass.on(name, () => {

  })
}
```

Examples of **correct** code for this rule:

```js
myClass.on(MyClass.Events.CHANGE, () => {

});
```

### Options

If there are any options, describe them here. Otherwise, delete this section.

`eventFunctions`: An array of function names to look for. Defaults to `['on', 'off', 'trigger', 'once']`