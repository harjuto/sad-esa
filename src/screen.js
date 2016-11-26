/**
 * Created by thar on 25/11/16.
 */
import {div} from '@cycle/dom'
import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
import './style/style.less'
import {Mascot} from './mascot';
import {Message} from './message';

const VIDEO_SAMPLE_RATE = 500;

export function Screen(sources) {

    // const videoSampler$ = xs.periodic(VIDEO_SAMPLE_RATE);
    const rawVideo$ = sources.VIDEO.startWith(0);
    // const videoUpstream$ = sources.WEBSOCKET;
    const mascot$ = Mascot(sources).DOM;
    const message$ = Message(sources).DOM;

    // const godStream$ = xs.combine(rawVideo$, mascot$)
    // .startWith(0)
    // .map(i => i)

    // const sampledVideoStream$ = videoSampler$.compose(sampleCombine(rawVideo$))
    const vtree$ = xs.combine(message$, mascot$, rawVideo$ )
      .map(([a,b,c ]) =>
        div('.screen',[
            a,
            b
            // div("Yo!"),
        ])
      );

    const sinks = {
        DOM: vtree$
    };

    return sinks
}
