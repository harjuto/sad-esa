/**
 * Created by thar on 25/11/16.
 */
import {div} from '@cycle/dom'
import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'

const VIDEO_SAMPLE_RATE = 500;

export function Screen(sources) {

    // const videoSampler$ = xs.periodic(VIDEO_SAMPLE_RATE);
    const rawVideo$ = sources.VIDEO;
    const videoUpstream$ = sources.WEBSOCKET;

    const godStream$ = xs.merge(rawVideo$, videoUpstream$).map(i => i)

    // const sampledVideoStream$ = videoSampler$.compose(sampleCombine(rawVideo$))
    const vtree$ = godStream$.map( a => {
        return (
          div('.screen',[
              div(a[0]),
              div("Yo!"),
          ])
        );
    });

    const sinks = {
        DOM: vtree$
    };

    return sinks
}