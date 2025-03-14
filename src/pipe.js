export const pipe2 = (a, b) => x => b(a(x))
export const pipe3 = (a, b, c) => x => c(b(a(x)))
export const pipe4 = (a, b, c, d) => x => d(c(b(a(x))))
export const pipe5 = (a, b, c, d, e) => x => e(d(c(b(a(x)))))
export const pipeN = (...fn) => fn.reduce(pipe2)

export default (...fs) => {
	switch (fs.length) {
		case 1: return fs[0]
		case 2: return pipe2.apply(null, fs)
		case 3: return pipe3.apply(null, fs)
		case 4: return pipe4.apply(null, fs)
		case 5: return pipe5.apply(null, fs)
	}
	return pipeN.apply(null, fs)
}
