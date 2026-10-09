export default (f, cache = new Map) => x => {
    if (!cache.has(x)) {
        const y = f(x)
        cache.set(x, y)
        return y
    }
    return cache.get(x)
}
