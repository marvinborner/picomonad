import * as state from "./state.js"

export const read =        st => s => s(st)(st.read())
export const write = ch => st => s => s(st)(st.write(ch))

export const unit = state.unit
export const bind = state.bind

export const DO = state.DO
