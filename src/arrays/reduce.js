export default (f, a) => {
	const n = a.length
	if (n <= 0)
		return; // undefined
	let r = a[0]
	for (let i = 1; i < n; i ++)
		r = f(r, a[i])
	return r
}
