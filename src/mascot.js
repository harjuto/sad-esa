import {div} from '@cycle/dom'
import xs from 'xstream'
import './style/style.less'
import delay from 'xstream/extra/delay'

export function Mascot (sources) {
  const vtree$ = xs.of(
    div('.mascot')
  )
  const sinks = {
    DOM: vtree$
  }
  return sinks
}
