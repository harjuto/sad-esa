import {run} from '@cycle/xstream-run'
import {makeDOMDriver} from '@cycle/dom'
import {App} from './app'
import {makeVideoUploadDriver} from './websocketDriver';

const main = App;

const drivers = {
  DOM: makeDOMDriver('#app'),
  VIDEO: makeVideoUploadDriver(),
  state: 
}

run(main, drivers)
