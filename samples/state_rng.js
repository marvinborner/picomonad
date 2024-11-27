import * as state from '../src/state.js'

const rng = max => seed => (1103515245 * seed + 12345) % max
const rand = seed => (g => state.State(g)(g))(rng(1000)(seed))

// or, simply:
const threeNumbers = state.DO(function* () {
    const a = yield rand
    const b = yield rand
    const c = yield rand
    return [a, b, c]
})

console.log(threeNumbers(161)(st => v => v)) // [790, 895, 620]
