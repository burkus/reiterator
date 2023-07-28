

export function makeStuff(size: number) {
    const buffer: number[] = []
    for (let i = 0; i < size; i++) {
        buffer.push(
            Math.floor(
                Math.random() * 100
            )
        )
    }

    return buffer
}