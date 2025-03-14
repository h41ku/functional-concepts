export const assert = (x, sample, msg) => {
	if (x !== sample) {
		throw new Error(`Assertion failed: ${x} !== ${sample}: ${msg}.`)
	}
}

export const passTest = test => {
	try {
		test()
		console.log(`${test.name}: passed.`)
	} catch (err) {
		console.error(`${test.name}: FAILED: ${err.message}`)
		console.error(err)
		process.exit(1)
	}
}
