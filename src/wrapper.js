export const DO = (unit, bind) => f => {
    const gen = f()
    const next = acc => {
        const {done, value} = gen.next(acc)
        return done ? unit(value) : bind(value)(next)
    }
    return next()
}
