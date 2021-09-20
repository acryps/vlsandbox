export class Sandbox {
    exposedVariables;

    constructor(private source: string) {
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

    run() {
        // combine global and exposed variables for argument list
        const variables = [
            ...Object.keys(globalThis),
            ...Object.keys(this.exposedVariables)
        ].filter((c, i, a) => a.indexOf(c) == i);

        // create scoped function
        const main = new Function(...variables, this.source);

        // run function
        main(variables.map(key => key in this.exposedVariables ? this.exposedVariables[key] : null));
    }
}