export default (f, arity = f.length) => {
    const r = function (...args) {
        return args.length >= arity
            ? f.apply(this, args)
            : (...moreArgs) => r.apply(this, args.concat(moreArgs))
    }
    return r
}
