import * as wrapper from "./wrapper.js"

export const Nothing   = nothing => just => nothing
export const Just = v => nothing => just => just(v)

export const isNothing = maybe => maybe(true)(_ => false)
export const isJust    = maybe => maybe(false)(_ => true)

export const getValue = just => just()(v => v)

export const show = maybe => maybe("Nothing")(v => "Just " + v)

export const unit = Just
export const bind = mx => f => mx(mx)(f)

export const DO = wrapper.DO(unit, bind)
