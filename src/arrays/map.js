export default (f, a) => {
	const n = a.length
	const r = new Array(n)
	for (let i = 0; i < n; i ++)
		r[i] = f(a[i])
	return r
}
