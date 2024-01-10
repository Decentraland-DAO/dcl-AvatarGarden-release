import * as DclTimers from '@dcl-sdk/utils/dist/timer'

export function delay(callback: () => void, time: number) {
    return DclTimers.timers.setTimeout(callback, time)
}
export function clearDelay(timeout: number) {
    DclTimers.timers.clearTimeout(timeout)
}

export function interval(callback: () => void, time: number) {
    return DclTimers.timers.setInterval(callback, time)
}

export function clearInterval(interval: number) {
    DclTimers.timers.clearInterval(interval)
}