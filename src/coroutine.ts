export function coroutine(f: Function) {
    const crt = f()
    crt.next()
    return (...args: any[]) => crt.next(...args)
}
