import {run} from '@cycle/xstream-run'
import {makeDOMDriver} from '@cycle/dom'
import {App} from './app'
import {makeVideoDriver} from './videoDriver';
import {makeWebsocketDriver} from './websocketDriver';

const main = App;

const drivers = {
  DOM: makeDOMDriver('#app'),
  VIDEO: makeVideoDriver(),
  WEBSOCKET: makeWebsocketDriver()
}

run(main, drivers)
