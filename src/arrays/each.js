export default (f, a) => {
	const n = a.length
	for (let i = 0; i < n; i ++) {
		if (f(a[i]) === false)
			break
	}
}
