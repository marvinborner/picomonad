import * as wrapper from "./wrapper.js"

export const Left  = v => left => right => left(v)
export const Right = v => left => right => right(v)

export const isLeft  = either => either(true)(_ => false)
export const isRight = either => either(false)(_ => true)

export const getLeft  = left  => left(v => v)()
export const getRight = right => right()(v => v)

export const show = either => either(v => "Left " + v)(v => "Right " + v)

export const unit = Right
export const bind = mx => f => mx(Left)(f)

export const DO = wrapper.DO(unit, bind)
