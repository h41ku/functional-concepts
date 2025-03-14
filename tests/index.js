import { assert, passTest } from './UnitTest.js'
import { compose, curry, flip, is, memoize, partial, pipe,
	concat, each, filter, find, findIndex, last, map, reduce,
	reduceRight, reverse, sort, unique, zip
 } from '../src/index.js'
import * as curried from '../src/curried/index.js'

function testPipe() {

	const double = x => x * 2
	const increment = x => x + 1

	const sample = double(increment(double(double(5)))) // 42
	const result = pipe(double, double, increment, double)(5)

	assert(result, sample, 'A0')
}

function testCompose() {

	const double = x => x * 2
	const increment = x => x + 1

	const sample = double(increment(double(double(5)))) // 42
	const result = compose(double, increment, double, double)(5)

	assert(result, sample, 'A0')
}

function testCurry() {

	const sum = (x, y, z) => x + y + z
	const curriedSum = curry(sum)

	const sample = sum(8, 13, 21)

	assert(curriedSum(8, 13, 21), sample, 'A0')
	assert(curriedSum(8, 13)(21), sample, 'A1')
	assert(curriedSum(8)(13, 21), sample, 'A2')
	assert(curriedSum(8)(13)(21), sample, 'A3')
}

function testIs() {

	class A { }
	class B extends A { }
	class C extends B { }
	class D { }

	const a = new A()
	const b = new B()
	const c = new C()
	const d = new D()

	assert(is(B, b), true, 'A1')
	assert(is(C, c), true, 'A2')
	assert(is(A, a), true, 'A0')
	assert(is(D, d), true, 'A3')

	assert(is(A, b), true, 'B0')
	assert(is(A, c), true, 'B1')
	assert(is(B, c), true, 'B2')

	assert(is(A, d), false, 'C0')

	assert(is(B, a), false, 'D0')
	assert(is(B, d), false, 'D1')

	assert(is(C, a), false, 'E0')
	assert(is(C, b), false, 'E1')
	assert(is(C, d), false, 'E2')

	assert(is(D, a), false, 'F0')
	assert(is(D, b), false, 'F1')
	assert(is(D, c), false, 'F2')

	const isA = curried.is(A)
	const isB = curried.is(B)
	const isC = curried.is(C)
	const isD = curried.is(D)

	assert(isB(b), true, 'G1')
	assert(isC(c), true, 'G2')
	assert(isA(a), true, 'G0')
	assert(isD(d), true, 'G3')

	assert(isA(b), true, 'H0')
	assert(isA(c), true, 'H1')
	assert(isB(c), true, 'H2')

	assert(isA(d), false, 'I0')

	assert(isB(a), false, 'J0')
	assert(isB(d), false, 'J1')

	assert(isC(a), false, 'K0')
	assert(isC(b), false, 'K1')
	assert(isC(d), false, 'K2')

	assert(isD(a), false, 'L0')
	assert(isD(b), false, 'L1')
	assert(isD(c), false, 'L2')
}

function testFlip() {

	const join = (...args) => args.join(',')

	const params = [ 11, 22, 33, 44, 55 ]

	assert(join(...params), '11,22,33,44,55', 'A0')
	assert(flip(join)(...params), '55,44,33,22,11', 'A1')

	const double = x => x * 2
	const increment = x => x + 1

	const v0 = double(increment(double(double(5)))) // 42
	const v1 = compose(double, increment, double, double)(5)
	const v2 = pipe(double, double, increment, double)(5)

	const prettyPipe = flip(compose)
	const v3 = prettyPipe(double, double, increment, double)(5)

	assert(v1, v0, 'B0')
	assert(v2, v0, 'B1')
	assert(v3, v0, 'B2')
}

function testPartial() {

	const sum = (x, y, z) => x + y + z

	const sample = sum(8, 13, 21)

	assert(partial(sum, 8, 13)(21), sample, 'A1')
	assert(partial(sum, 8)(13, 21), sample, 'A2')
	assert(partial(sum, 8, 13, 21)(), sample, 'A3')
}

function testMemoize() {

	let counter
	const f = x => {
		counter ++
		return x + 1
	}

	counter = 0; f(f(f(0)))
	assert(counter, 3, 'A0')

	const g = memoize(f)

	counter = 0; g(g(g(0)))
	assert(counter, 3, 'A1')

	g(g(g(0)))
	assert(counter, 3, 'A2')
}

function testConcat() {

	const a = []
	const b = [11,22]
	const c = [33,44,55]
	const d = [66]
	const e = []
	const f = [77,88]

	assert(concat().join(','), '', 'A0')
	assert(concat(a).join(','), '', 'A1')
	assert(concat(a, b).join(','), '11,22', 'A2')
	assert(concat(b, c).join(','), '11,22,33,44,55', 'A3')
	assert(concat(a, b, c).join(','), '11,22,33,44,55', 'A4')
	assert(concat(a, b, c, d, e).join(','), '11,22,33,44,55,66', 'A5')
	assert(concat(a, b, c, d, e, f).join(','), '11,22,33,44,55,66,77,88', 'A6')
}

function testEach() {

	const a = []
	const b = [11,22]
	const c = [33,44,55]
	const d = [66]
	const e = []
	const f = [77,88]

	const t = a => {
		let r = ''
		each(x => {
			r += (r.length ? ',' : '') + x
		}, a)
		return r
	}

	assert(t([]), '', 'A0')
	assert(t([...a]), '', 'A1')
	assert(t([...a, ...b]), '11,22', 'A2')
	assert(t([...b, ...c]), '11,22,33,44,55', 'A3')
	assert(t([...a, ...b, ...c]), '11,22,33,44,55', 'A4')
	assert(t([...a, ...b, ...c, ...d, ...e]), '11,22,33,44,55,66', 'A5')
	assert(t([...a, ...b, ...c, ...d, ...e, ...f]), '11,22,33,44,55,66,77,88', 'A6')

	const w = a => {
		let r = ''
		curried.each(x => {
			r += (r.length ? ',' : '') + x
		})(a)
		return r
	}

	assert(w([]), '', 'B0')
	assert(w([...a]), '', 'B1')
	assert(w([...a, ...b]), '11,22', 'B2')
	assert(w([...b, ...c]), '11,22,33,44,55', 'B3')
	assert(w([...a, ...b, ...c]), '11,22,33,44,55', 'B4')
	assert(w([...a, ...b, ...c, ...d, ...e]), '11,22,33,44,55,66', 'B5')
	assert(w([...a, ...b, ...c, ...d, ...e, ...f]), '11,22,33,44,55,66,77,88', 'B6')
}

function testFilter() {

	const a = []
	const b = [11,22,33,44,55,66]
	const c = [11,33,55]

	const p = x => x % 2 === 0

	assert(filter(p, a).join(','), '', 'A0')
	assert(filter(p, b).join(','), '22,44,66', 'A1')
	assert(filter(p, c).join(','), '', 'A2')

	const f = curried.filter(p)

	assert(f(a).join(','), '', 'B0')
	assert(f(b).join(','), '22,44,66', 'B1')
	assert(f(c).join(','), '', 'B2')
}

function testFind() {

	const a = []
	const b = [11,22,33,44,55,66]

	assert(find(x => x === 33, a), undefined, 'A0')
	assert(find(x => x === 33, b), 33, 'A1')
	assert(find(x => x === 99, b), undefined, 'A2')

	assert(curried.find(x => x === 33)(a), undefined, 'B0')
	assert(curried.find(x => x === 33)(b), 33, 'B1')
	assert(curried.find(x => x === 99)(b), undefined, 'B2')
}

function testFindIndex() {

	const a = []
	const b = [11,22,33,44,55,66]

	assert(findIndex(x => x === 33, a), -1, 'A0')
	assert(findIndex(x => x === 33, b), 2, 'A1')
	assert(findIndex(x => x === 99, b), -1, 'A2')

	assert(curried.findIndex(x => x === 33)(a), -1, 'B0')
	assert(curried.findIndex(x => x === 33)(b), 2, 'B1')
	assert(curried.findIndex(x => x === 99)(b), -1, 'B2')
}

function testLast() {

	const a = []
	const b = [11,22,33,44,55,66]
	const c = [11]

	assert(last(a), undefined, 'A0')
	assert(last(b), 66, 'A1')
	assert(last(c), 11, 'A2')
}

function testMap() {

	const a = []
	const b = [11,22,33,44,55,66]
	const c = [11]

	const increase = x => x + 1

	assert(map(increase, a).join(',') + '<-' + a.join(','), '<-', 'A0')
	assert(map(increase, b).join(',') + '<-' + b.join(','), '12,23,34,45,56,67<-11,22,33,44,55,66', 'A1')
	assert(map(increase, c).join(',') + '<-' + c.join(','), '12<-11', 'A2')

	const f = curried.map(increase)

	assert(f(a).join(',') + '<-' + a.join(','), '<-', 'A0')
	assert(f(b).join(',') + '<-' + b.join(','), '12,23,34,45,56,67<-11,22,33,44,55,66', 'A1')
	assert(f(c).join(',') + '<-' + c.join(','), '12<-11', 'A2')
}

function testReduce() {

	const a = []
	const b = [100,50,9]
	const c = [11]

	const f = (x, y) => x - y

	assert(reduce(f, a), undefined, 'A0')
	assert(reduce(f, b), 41, 'A1')
	assert(reduce(f, c), 11, 'A2')

	const g = curried.reduce(f)

	assert(g(a), undefined, 'B0')
	assert(g(b), 41, 'B1')
	assert(g(c), 11, 'B2')
}

function testReduceRight() {

	const a = []
	const b = [100,50,9]
	const c = [11]

	const f = (x, y) => x - y

	assert(reduceRight(f, a), undefined, 'A0')
	assert(reduceRight(f, b), -141, 'A1')
	assert(reduceRight(f, c), 11, 'A2')

	const g = curried.reduceRight(f)

	assert(g(a), undefined, 'B0')
	assert(g(b), -141, 'B1')
	assert(g(c), 11, 'B2')
}

function testReverse() {

	const a = []
	const b = [11,22,33,44,55,66]
	const c = [11]

	assert(reverse(a).join(',') + '<-' + a.join(','), '<-', 'A0')
	assert(reverse(b).join(',') + '<-' + b.join(','), '66,55,44,33,22,11<-11,22,33,44,55,66', 'A1')
	assert(reverse(c).join(',') + '<-' + c.join(','), '11<-11', 'A2')
}

function testSort() {

	const a = []
	const b = [11,33,22,44,55,77,66]
	const c = [22,11]
	const d = [33,22,11]
	const e = [11,22,33]

	const compare = (x, y) => x - y

	assert(sort(compare, a).join(',') + '<-' + a.join(','), '<-', 'A0')
	assert(sort(compare, b).join(',') + '<-' + b.join(','), '11,22,33,44,55,66,77<-11,33,22,44,55,77,66', 'A1')
	assert(sort(compare, c).join(',') + '<-' + c.join(','), '11,22<-22,11', 'A2')
	assert(sort(compare, d).join(',') + '<-' + d.join(','), '11,22,33<-33,22,11', 'A3')
	assert(sort(compare, e).join(',') + '<-' + e.join(','), '11,22,33<-11,22,33', 'A4')

	const f = curried.sort(compare)

	assert(f(a).join(',') + '<-' + a.join(','), '<-', 'B0')
	assert(f(b).join(',') + '<-' + b.join(','), '11,22,33,44,55,66,77<-11,33,22,44,55,77,66', 'B1')
	assert(f(c).join(',') + '<-' + c.join(','), '11,22<-22,11', 'B2')
	assert(f(d).join(',') + '<-' + d.join(','), '11,22,33<-33,22,11', 'B3')
	assert(f(e).join(',') + '<-' + e.join(','), '11,22,33<-11,22,33', 'B4')
}

function testUnique() {

	const a = []
	const b = [11,33,33,11,22]
	const c = [22,11]
	const d = [33]

	assert(unique(a).join(',') + '<-' + a.join(','), '<-', 'A0')
	assert(unique(b).join(',') + '<-' + b.join(','), '11,33,22<-11,33,33,11,22', 'A1')
	assert(unique(c).join(',') + '<-' + c.join(','), '22,11<-22,11', 'A2')
	assert(unique(d).join(',') + '<-' + d.join(','), '33<-33', 'A3')
}

function testZip() {

	const a = [
		[11,22,33]
	]
	const b = [
		[11,22,33],
		[44,55,66]
	]
	const c = [
		[11,22,33,44],
		[55,66,77,88],
		[99,10,20,30]
	]
	const d = []

	const line1 = points => map(([x]) => `(${x})`, points).join(',')
	const line2 = points => map(([x, y]) => `(${x};${y})`, points).join(',')
	const line3 = points => map(([x, y, z]) => `(${x};${y};${z})`, points).join(',')

	const p = (...xs) => xs

	assert(line1(zip(p, ...a)), '(11),(22),(33)', 'A0')
	assert(line2(zip(p, ...b)), '(11;44),(22;55),(33;66)', 'A1')
	assert(line3(zip(p, ...c)), '(11;55;99),(22;66;10),(33;77;20),(44;88;30)', 'A2')
	assert(line1(zip(p, ...d)), '', 'A3')
	assert(line2(zip(p, ...d)), '', 'A4')
	assert(line3(zip(p, ...d)), '', 'A5')

	const f = curried.zip(p)

	assert(line1(f(...a)), '(11),(22),(33)', 'B0')
	assert(line2(f(...b)), '(11;44),(22;55),(33;66)', 'B1')
	assert(line3(f(...c)), '(11;55;99),(22;66;10),(33;77;20),(44;88;30)', 'B2')
	assert(line1(f(...d)), '', 'B3')
	assert(line2(f(...d)), '', 'B4')
	assert(line3(f(...d)), '', 'B5')
}

passTest(testPipe)
passTest(testCompose)
passTest(testCurry)
passTest(testIs)
passTest(testFlip)
passTest(testPartial)
passTest(testMemoize)

passTest(testConcat)
passTest(testEach)
passTest(testFilter)
passTest(testFind)
passTest(testFindIndex)
passTest(testLast)
passTest(testMap)
passTest(testReduce)
passTest(testReduceRight)
passTest(testReverse)
passTest(testSort)
passTest(testUnique)
passTest(testZip)

console.log('\nAll tests passed.\n')
