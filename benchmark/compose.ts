import { makeStuff } from "./stuff.ts";

const stuff = makeStuff(Math.pow(10, 7))

const double = (x: number) => x * 2
const square = (x: number) => x * x
const addOne = (x: number) => x + 1

stuff
    .map(x =>
        double(
            square(
                addOne(x)
            )
        )
    )