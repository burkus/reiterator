
export const range = (start: number, end: number, increment: number = 1) => {
    const iter = function* () {
        let i = start
        while (i < end) {
            yield i
            i += increment
        }
    }

    return new Iterator(iter())
}

export const chain = (...iterables: IterableIterator<any>[] | Iterator[]) => {
    const iter = function* () {
        for (let it of iterables) {
            for (let i of it) {
                yield i
            }
        }
    }
    return new Iterator(iter())
}

type JSCollection = Array<any> | Set<any> | Map<any, any>

export const intoIter = (collection: JSCollection | object) => {
    if(isJSCollection(collection)) { 
        return new Iterator((collection as JSCollection)[Symbol.iterator]())
    }
    const iter = keyValueGenerator(collection as Record<string, unknown>)
    return new Iterator(iter)
}

const isJSCollection = (thing: any) => {
    if(typeof thing === 'object') {
        const isCollection = thing instanceof Array 
        || thing instanceof Set
        || thing instanceof Map
        return isCollection
    }
    return false
}

const keyValueGenerator = function* (obj: Record<string, unknown>) {
    for (let key in obj) {
        yield [key, obj[key]]
    }
}

type IterableFnWithIndex<T> = (value: any, index: number) => T
type IterableFn<T> = (value: any) => T
type IterableChainFn<T> = IterableFn<T> | IterableFnWithIndex<T>
type Predicate = IterableChainFn<boolean>
type MapFn = IterableChainFn<any>

export class Iterator {
    fn: IterableIterator<any>
    constructor(f: IterableIterator<any>) {
        this.fn = f
    }

    *[Symbol.iterator]() {
        for (let i of this.fn) {
            yield i
        }
    }

    enumerate() {
        const self = this
        const iter = function* () {
            let i = 0
            for (let value of self) {
                yield [value, i] as [any, number]
                i++
            }
        }

        return new Iterator(iter())
    }

    map(f: MapFn) {
        const self = this
        const iter = function* () {
            for (let [value, index] of self.enumerate()) {
                yield f(value, index)
            }
        }

        return new Iterator(iter())
    }

    filter(predicate: Predicate) {
        const self = this
        const iter = function* () {
            for (let [value, index] of self.enumerate()) {
                if (predicate(value, index)) yield value
            }
        }

        return new Iterator(iter())
    }

    filterFalse(predicate: Predicate) {
        const self = this
        const iter = function* () {
            for (let [value, index] of self.enumerate()) {
                if (!predicate(value, index)) yield value
            }
        }
        return new Iterator(iter())
    }

    reduce(reducer: Function, init: any) {
        let acc = init
        for (let i of this) {
            acc = reducer(acc, i)
        }

        return acc
    }

    reverse() {
        const self = this
        const iter = function* () {
            const arr = self.collect()
            for (let i = arr.length - 1; i >= 0; i--) {
                yield arr[i]
            }
        }

        return new Iterator(iter())
    }

    collect() {
        return Array.from(this)
    }

    collectSet() {
        return new Set(this)
    }
}
