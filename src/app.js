import {div} from '@cycle/dom'
import xs from 'xstream'
import './style/style.less'
import {Mascot} from './mascot'

export function App (sources) {
  const mascot$ = Mascot().DOM;

  const sinks = {
    DOM: mascot$
  }
  return sinks
}
