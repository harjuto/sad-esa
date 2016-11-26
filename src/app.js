import {div} from '@cycle/dom'
import xs from 'xstream'
import './style/style.less'
import {Screen} from './screen';

export function App (sources) {

  const screen$ = Screen(sources).DOM;

  const sinks = {
    DOM: screen$
  }

  return sinks
}
