import * as maybe from "../src/maybe.js"
import * as fs from "fs"

function divide(a, b) {
    if (b === 0)
        return maybe.Nothing
    return maybe.Just(a / b)
}

const input = +fs.readFileSync(0, "utf-8");
const result = maybe.DO(function* () {
    const a = yield divide(42, input)
    const b = yield divide(42, a)
    const c = yield divide(b, a)
    return c
})

console.log(maybe.show(result))
