export const compose2 = (a, b) => x => a(b(x))
export const compose3 = (a, b, c) => x => a(b(c(x)))
export const compose4 = (a, b, c, d) => x => a(b(c(d(x))))
export const compose5 = (a, b, c, d, e) => x => a(b(c(d(e(x)))))
export const composeN = (...fn) => fn.reduce(compose2)

export default (...fs) => {
	switch (fs.length) {
		case 1: return fs[0]
		case 2: return compose2.apply(null, fs)
		case 3: return compose3.apply(null, fs)
		case 4: return compose4.apply(null, fs)
		case 5: return compose5.apply(null, fs)
	}
	return composeN.apply(null, fs)
}
