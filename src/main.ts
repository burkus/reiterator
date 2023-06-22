import { range } from './Iterator.ts'

const mathed =
  range(0, 10)
    .map((x: number) => x * 2)
    .map((x: number) => x * 10)
    .filter((x: number) => x >= 100)
    .reduce((acc: number, x: number) => acc + x, 0)

console.log(mathed)