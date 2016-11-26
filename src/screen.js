/**
 * Created by thar on 25/11/16.
 */
import {div} from '@cycle/dom'
import xs from 'xstream'
import './style/style.less'
import {Mascot} from './mascot';
import {Message} from './message';
import sampleCombine from 'xstream/extra/sampleCombine'


function animation(sources) {
    const animation$ = sources.VIDEO
      .startWith("idle");

    const sinks = {
        anim: animation$
    }

    return sinks;
}


export function Screen(sources) {

    const anim$ = animation(sources).anim;

    const mascot$ = Mascot(sources).DOM;
    const message$ = Message(sources).DOM;

    const god$ = anim$.compose(sampleCombine(mascot$, message$));

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
