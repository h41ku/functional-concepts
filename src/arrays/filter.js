export default (f, a) => {
	const n = a.length
	const r = []
	for (let i = 0; i < n; i ++) {
		const x = a[i]
		if (f(x))
			r.push(x)
	}
	return r
}
