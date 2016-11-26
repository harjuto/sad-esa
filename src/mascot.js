import {div} from '@cycle/dom'
import xs from 'xstream'
import './style/mascot.less'

export function Mascot (sources) {
  const vtree$ = xs.of(
    div('.mascot')
  )
  const sinks = {
    DOM: vtree$
  }
  return sinks
}
