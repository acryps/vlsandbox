export class Sandbox {
    exposedVariables;

    constructor(private source: string) {
        // check for function() in source
        // you could use the following code to escape the sandbox because referencing this in a function will return the globalThis
        //
        //    const globals = (function () { return this })();
        //
        if (/function\s*([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/.test(source)) {
            throw new Error("Unsafe sandbox input. Convert function() to arrow functions.");
        }

        this.reset();
    }

    reset() {
        this.exposedVariables = {};
    }

    expose(name: string, value?: any) {
        if (arguments.length == 1) {
            if (name in globalThis) {
                this.exposedVariables[name] = globalThis[name];
            } else {
                throw new Error(`Can't export ${name} automatically because it is not defined in globalThis.`);
            }
        } else {
            this.exposedVariables[name] = value;
        }
    }

    run(scope) {
        // combine global and exposed variables for argument list
        const variables = [
            ...Object.keys(globalThis),
            ...Object.keys(this.exposedVariables)
        ].filter((c, i, a) => a.indexOf(c) == i);

        // create scoped function
        const main = new Function(...variables, this.source).bind(scope || {});

        // run function
        main(...variables.map(key => key in this.exposedVariables ? this.exposedVariables[key] : null));
    }
}