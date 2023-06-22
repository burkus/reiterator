export const chain = (...iterables: IterableIterator<any>[]) => {
    const iter = function* () {
        for (let it of iterables) {
            for (let i of it) {
                yield i
            }
        }
    }

    return iter()
}