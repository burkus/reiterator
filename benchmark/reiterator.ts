import { makeStuff } from "./stuff.ts";
import {intoIter} from '../src/Iterator.ts'

const stuff = makeStuff(Math.pow(10, 7))

const double = (x: number) => x * 2
const square = (x: number) => x * x
const addOne = (x: number) => x + 1

const iter = intoIter(stuff)


iter
    .map(double)
    .map(square)
    .map(addOne)
    .collect()
