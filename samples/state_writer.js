import * as state from '../src/state.js'

const log = (a, str) => st => state.State(a)(st + str)

const deepthought = state.DO(function* () {
    const answer = yield log(42, "Finding answer... ")
    const correct = yield log(answer == 42, "Checking answer... ")
    if (correct) yield log(null, "Is correct!") 
    else yield log(null, "Is false!")
    return answer
})

console.log(deepthought("")(log => answer => ({answer, log})))
