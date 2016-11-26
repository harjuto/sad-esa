import {div} from '@cycle/dom'
import xs from 'xstream'
import './style/container.less'

export function Container (sources) {
  const vtree$ = xs.of(
    div('.container')
  )
  const sinks = {
    DOM: vtree$
  }
  return sinks
}
