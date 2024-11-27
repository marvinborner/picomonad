import * as parser from "../src/parser.js"
import * as fs from "fs"

// try piping "Hello, World" into stdin!
const input = fs.readFileSync(0, "utf-8");

const parse = parser.DO(function* () {
    const p = yield parser.string("Hello")
    yield parser.char(',')
    yield parser.char(' ')
    return p
})
console.log(parser.show(parse(input)))
