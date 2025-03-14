export interface IMap {
    get(key: any | undefined): any | undefined,
    has(key: any | undefined): boolean,
    set(key: any | undefined, value: any | undefined): any | undefined,
}

export declare function compose(...fs: Array<Function>): Function;
export declare function curry(f: Function, arity: number = f.length): Function;
export declare function flip(f: Function): Function;
export declare function is(type: any): (x: any) => boolean;
export declare function memoize(f: Function, cache: IMap = ((new Map) as IMap)): Function;
export declare function partial(f: Function, ...args: Array<any | undefined> | undefined): Function;
export declare function pipe(...fs: Array<Function>): Function;

export declare function concat(...arrays: Array<Array>): Array;
export declare function each(f: Function): (a: Array) => void;
export declare function filter(f: Function): (a: Array) => Array;
export declare function find(f: Function): (a: Array) => any | undefined;
export declare function findIndex(f: Function): (a: Array) => number;
export declare function last(a: Array): any | undefined;
export declare function map(f: Function): (a: Array) => Array;
export declare function reduce(f: Function): (a: Array) => any | undefined;
export declare function reduceRight(f: Function): (a: Array) => any | undefined;
export declare function reverse(a: Array): Array;
export declare function sort(a: Array): Array;
export declare function unique(a: Array): Array;
export declare function zip(f: Function): (...arrays: Array<Array>) => Array;
