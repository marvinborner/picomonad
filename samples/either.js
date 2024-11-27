import * as either from "../src/either.js"
import * as fs from "fs"

function divide(a, b) {
    if (b === 0)
        return either.Left("Error: Division by zero!")
    return either.Right(a / b)
}

// try piping 42 or 0 into stdin
const input = +fs.readFileSync(0, "utf-8");
const result = either.DO(function* () {
    const a = yield divide(42, input)
    const b = yield divide(42, a)
    const c = yield divide(b, a)
    return c
})

console.log(either.show(result));
