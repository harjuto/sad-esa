import {div, p} from '@cycle/dom'
import xs from 'xstream'

export function Message (sources) {
  const vtree$ = xs.of(
    div('.message', [p('PPPPSSTTT!')])
  )
  const sinks = {
    DOM: vtree$
  }
  return sinks
}
