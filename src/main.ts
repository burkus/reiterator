import { range, chain } from './Iterator.ts'

const mathed =
  range(0, 10)
    .map((x: number) => x * 2)
    .map((x: number) => x * 10)
    .filter((x: number) => x >= 100)
    .reduce((acc: number, x: number) => acc + x, 0)

console.log(mathed)

const r1 = range(0, 10)
const r2 = range(10, 20)
const r3 = chain(...[r1, r2])

console.log(r3.collect())