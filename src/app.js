import './style/style.less'
import {Screen} from './screen';
import {Mascot} from './mascot';

export function App (sources) {
  const screen$ = Screen(sources).DOM;



  const view$ = screen$
  .startWith(0)
  .map( screen =>
    div(".container", [
      screen
    ])
)

  const sinks = {
    DOM: view$
  }

  return sinks
}
