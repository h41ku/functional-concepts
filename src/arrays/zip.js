import map from './map.js'

export default (f, ...arrays) => {
    if (arrays.length > 0) {
        const n = arrays[0].length
        const r = new Array(n)
        for (let i = 0; i < n; i ++)
            r[i] = f(...map(a => a[i], arrays))
        return r
    }
    return []
}
