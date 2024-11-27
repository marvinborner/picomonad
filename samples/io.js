import * as io from "../src/io.js"
import * as fs from "fs"

const writeLine = str => io.DO(function* () {
    const head = str[0]
    const tail = str.slice(1)

    yield io.write(head)
    yield tail === "" ? io.write('\n') : writeLine(tail)
})

const readLine = io.bind(io.read)(ch =>
    ch === '\r' ? io.unit("")
                : io.bind(readLine)(line => io.unit(ch + line))
)

const nodeEffects = () => {
    process.stdin.setRawMode(true)
    const buffer = Buffer.alloc(1)
    const fd = fs.openSync("/dev/tty", "rs")
    return {
        write: process.stdout.write.bind(process.stdout),
        read: () => {
            fs.readSync(fd, buffer, 0, 1)
            return buffer.toString("utf8")
        }
    }
}

const Person = name => age => person => person(name)(age)

const constructPerson = io.DO(function* () {
    yield writeLine("Please enter your name!")
    const name = yield readLine
    yield writeLine(`Hello ${name}! Now please enter your age.`)
    const age = yield readLine
    return Person(name)(age) // arbitrary data!
})

console.log(constructPerson(nodeEffects())(st => v => v(
    name => age => `Person(name: ${name}, age: ${age})`
)));
