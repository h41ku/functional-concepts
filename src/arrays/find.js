export default (f, a) => {
	const n = a.length
	for (let i = 0; i < n; i ++) {
		const x = a[i]
		if (f(x))
			return x
	}
	// return undefined
}
