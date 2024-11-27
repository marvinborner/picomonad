// translating de Bruijn levels in lambda terms to unique variables
import * as state from '../src/state.js'

const Abs = n => m => abs => app => lvl => abs(n)(m)
const App = f => x => abs => app => lvl => app(f)(x)
const Lvl =      l => abs => app => lvl => lvl(l)

const transform = term => term
    // case: Abstraction
    (_ => m => state.DO(function* () {
        const {ctr, stk} = yield state.get
        yield state.put({ctr: ctr + 1, stk: [ctr, ...stk]})
        const _m = yield transform(m)
        yield state.modify(({ctr}) => ({ctr, stk}))
        return Abs(ctr)(_m)
    }))
    // case: Application
    (f => x => state.ap
        (state.fmap(App)(transform(f)))
        (transform(x))
    )
    // case: de Bruijn level
    (l => state.DO(function* () {
        const {stk} = yield state.get
        return Lvl(stk[stk.length - l - 1])
    }))

const prettyTerm = term => term
    (n => m => `λ${n}.${prettyTerm(m)}`)
    (f => x => `(${prettyTerm(f)} ${prettyTerm(x)})`)
    (l => l)

// (λλ(0 0) λ0)
const term = App(Abs()(Abs()(App(Lvl(0))(Lvl(0)))))(Abs()(Lvl(0)))

console.log(transform(term)({ctr: 0, stk: []})(_ => t => prettyTerm(t)))
// (λ0.λ1.(0 0) λ2.2)
