import * as wrapper from "./wrapper.js"

export const State = v => st => s => s(st)(v)

export const get =         st => s => s(st)(st)
export const put =  _st => st => s => s(_st)()
export const modify = f => st => s => s(f(st))()

export const fmap = f => g => st0 => g(st0)(st1 => a => s => s(st1)(f(a)))
export const ap = f0 => x0 => st0 => f0(st0)(st1 => f1 => x0(st1)(st2 => x1 => s => s(st2)(f1(x1))))

export const unit = State
export const bind = run => f => s0 => run(s0)(s1 => v => f(v)(s1))

export const DO = wrapper.DO(unit, bind)
