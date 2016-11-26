/**
 * Created by thar on 25/11/16.
 */
import {div} from '@cycle/dom'
import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
import './style/style.less'
import {Mascot} from './mascot';
import {Message} from './message';


export function Screen(sources) {

    const ville$ = sources.VIDEO
      .startWith({active: false});


    const mascot$ = Mascot(sources).DOM;
    const message$ = Message(sources).DOM;


    // const sampledVideoStream$ = videoSampler$.compose(sampleCombine(rawVideo$))
    const vtree$ = xs.combine(message$, mascot$, ville$ )
      .map(([a,b,c ]) => {
          var blaa = c ? c.active : "kissa"
          console.info(c);
        return (
          div('.screen',[
              a,
              b,
              blaa,
          ])
        )

      }

      );

    const sinks = {
        DOM: vtree$
    };

    return sinks
}
