export default (f, cache = new Map) => x => {
    if (!cache.has(x))
        cache.set(x, f(x))
    return cache.get(x)
}
