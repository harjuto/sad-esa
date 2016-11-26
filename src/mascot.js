import {div} from '@cycle/dom'
import xs from 'xstream'
import './style/style.less'
import delay from 'xstream/extra/delay'

export function Mascot (sources) {

  const vtree$ = animate$
    .map(animation =>
      div('.mascot' + animation)
    )

  const sinks = {
    DOM: vtree$
  }
  return sinks
}
