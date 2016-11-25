import {div} from '@cycle/dom'
import xs from 'xstream'
import './style/style.less'

export function App (sources) {
  const vtree$ = xs.of(
    div('.my-class','My Awesome Cycle.js app')
  )
  const sinks = {
    DOM: vtree$
  }
  return sinks
}
