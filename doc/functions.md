# Converting conventional function to arrow functions
Due to security limitations, vlsandbox *requires* the use of the modern arrow functions.

Your code probably looks like this right now:
```
function test(foo, bar) {
    // some code ...
}

test(1, 2);
```

The arrow function alternative looks like this:
```
const test = (test, bar) => {
    // some code ...
};

test(1, 2);
```

---

Pro tip: Arrow functions allow you to make one-liner functions much shorter:
```
function add(a, b) {
    return a + b
}

const add = (a, b) => a + b;
```

## Functions as Classes
Javascript used to not have classes, so people used functions with `this`. 

```
function Test(parameter) { 
    this.foo = function () { 
        console.log("foo") 
    } 
}
```

The new way to do it looks like this and will work in vlsandbox:
```
class Test {
    constructor(parameter) {}

    foo() {
        console.log("foo");
    }
}
```