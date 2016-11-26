/**
 * Created by thar on 25/11/16.
 */
import {div} from '@cycle/dom'
import xs from 'xstream'
import './style/style.less'
import {Mascot} from './mascot';
import {Message} from './message';
import sampleCombine from 'xstream/extra/sampleCombine'


export function Screen(sources) {

    const ville$ = sources.VIDEO
      .startWith({active: false});


    const mascot$ = Mascot(sources).DOM;
    const message$ = Message(sources).DOM;

    const god$ = ville$.compose(sampleCombine(mascot$, message$));


    // const sampledVideoStream$ = videoSampler$.compose(sampleCombine(rawVideo$))
    const vtree$ = god$
      .map(([a,b,c]) => {
        return (
          div('.screen',[
              a,
              b,
              c,
          ])
        )

      }

      );

    const sinks = {
        DOM: vtree$
    };

    return sinks
}
