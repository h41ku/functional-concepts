import _curry from '../curry.js'
export { default as compose } from '../compose.js'
export { default as pipe } from '../pipe.js'
export { default as flip } from '../flip.js'
import _partial from '../partial.js'
import _is from '../is.js'
export { default as memoize } from '../memoize.js'
export { default as concat } from '../arrays/concat.js'
import _each from '../arrays/each.js'
import _filter from '../arrays/filter.js'
import _find from '../arrays/find.js'
import _findIndex from '../arrays/findIndex.js'
export { default as last } from '../arrays/last.js'
import _map from '../arrays/map.js'
import _reduce from '../arrays/reduce.js'
import _reduceRight from '../arrays/reduceRight.js'
export { default as reverse } from '../arrays/reverse.js'
import _sort from '../arrays/sort.js'
export { default as unique } from '../arrays/unique.js'
import _zip from '../arrays/zip.js'

export const curry = _curry
export const is = curry(_is)
export const each = curry(_each)
export const filter = curry(_filter)
export const find = curry(_find)
export const findIndex = curry(_findIndex)
export const map = curry(_map)
export const reduce = curry(_reduce)
export const reduceRight = curry(_reduceRight)
export const sort = curry(_sort)
export const zip = curry(_zip, 2)
