export default (f, a) => {
	const n = a.length
	if (n <= 0)
		return; // undefined
	let r = a[n - 1]
	for (let i = n - 2; i >= 0; i --)
		r = f(r, a[i])
	return r
}
