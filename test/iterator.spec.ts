import {intoIter, range, chain} from '../src/Iterator'

test('intoIter consumes Array', async () => {
    const arr = [1, 2, 3]
    const iter = intoIter(arr)
    for(let [value, index] of iter.enumerate()) {
        expect(value).toBe(arr[index])
    }
})

test('intoIter consumes Set', async () => {
    const set = new Set([1, 2, 3])
    const iter = intoIter(set)
    for(let value of iter) {
        expect(set.has(value)).toBe(true)
    }
})

test('intoIter consumes Map', async () => {
    const map = new Map([['a', 1], ['b', 2], ['c', 3]])
    const iter = intoIter(map)
    for(let [key, value] of iter) {
        expect(map.get(key)).toBe(value)
    }
})

test('intoIter consumes Object', async () => {
    const obj = {
        a: 1,
        b: 2,
        c: 3
    } as Record<string, unknown>
    const iter = intoIter(obj)
    for(let [key, value] of iter) {
        expect(obj[key]).toBe(value)
    }
})

test('collect returns array', async () => {
    const arr = range(0,10).collect()
    expect(arr).toEqual([0,1,2,3,4,5,6,7,8,9])
    expect(arr instanceof Array).toBe(true)
})

test('collectSet returns set', async () => {
    const set = range(0,10).collectSet()
    for(const value of range(0, 10)) {
        expect(set.has(value)).toBe(true)
    }
    expect(set instanceof Set).toBe(true)
})

test('reverse returns reversed array', async () => {
    const reversed = range(0, 3).reverse().collect()
    const expected = [2, 1, 0]
    expect(reversed).toEqual(expected)
})

test('range returns range array', async () => {
    const rangeArray = range(0, 3).collect()
    const expected = [0, 1, 2]
    expect(rangeArray).toEqual(expected)
})

test('range returns range array with specified increment', async () => {
    const rangeArray = range(0, 3, 2).collect()
    const expected = [0, 2]
    expect(rangeArray).toEqual(expected)
})

test('map is called for every element', async () => {
    const r = range(0, 10)
    const mapFn = jest.fn()
    r.map(mapFn).collect()
    expect(mapFn).toHaveBeenCalledTimes(10)
})

test('chain chains iterators', async () => {
    const r1 = range(0, 10)
    const r2 = range(10, 20)
    const r3 = chain(r1, r2)
    const expected = range(0, 20).collect()
    expect(r3.collect()).toEqual(expected)
})

