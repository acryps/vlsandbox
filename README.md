[![npm version](http://badge.acryps.com/npm/vlsandbox)](http://badge.acryps.com/go/npm/vlsandbox)

# vlsandbox Scoped Sandbox
Need to run external code (e.g. Plugins)) in your application, without exposing `window` object? Try vlsandbox

```
const sandbox = new Sandbox(`
    alert(message);
`);

sandbox.run(); // will throw an error, as alert and message are exposed to the sandbox

sandbox.expose("alert"); // allow access to window.alert
sandbox.expose("message", "Hello World"); // pass custom variable

sandbox.run(); // will show a alert "Hello World"
```

## Security and implications
> Do NOT use this framework as a end-all-be-all solution to encapsulating external code. vlsandbox will not prevent you from exposing a objected containing a window reference! Never expose HTML-Elements to sandboxes!

You can't use the classic function declaration within sandboxes, because `globalThis` can be obtained as demonstrated in this example:
```
console.log(() => this); // will return {} or whatever you passed to run(scope?)
console.log(function() { return this }) // will return globalThis
```

## Sponsoring and support
This project is sponsored and supported by [VLVT.IN GmbH](https://vlvt.in), [luucy AG](https://luucy.ch) and [inter allied crypsis / ACRYPS](https://acryps.com).