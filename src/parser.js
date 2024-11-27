import * as wrapper from "../src/wrapper.js"
import * as either from "../src/either.js"

export const show = either =>
    either(v => "Error: " + v)(v => v(cur => rst => ({ cur, rst })))

export const unit = cur => rst => either.Right(s => s(cur)(rst))
export const bind = p => f => s => either.bind(p(s))(right => right(cur => rst => f(cur)(rst)))

export const DO = wrapper.DO(unit, bind)

export const satisfy = pred => s => {
    if (s === "") return either.Left("end of input")
    const head = s[0]
    const tail = s.slice(1)
    return pred(head) ? either.Right(s => s(head)(tail))
                      : either.Left("unexpected " + head)
}

export const char = ch => satisfy(c => c == ch)

export const string = str => DO(function* () {
    const head = str[0]
    const tail = str.slice(1)
    yield char(head)
    return yield tail === "" ? unit(str)
                             : bind(string(tail))(_ => unit(str))
})
