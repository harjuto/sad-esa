/**
 * Created by thar on 25/11/16.
 */
import {div} from '@cycle/dom'
import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'


export function Screen(sources) {

    // const videoSampler$ = xs.periodic(VIDEO_SAMPLE_RATE);
    const rawVideo$ = sources.VIDEO;
    const videoUpstream$ = sources.WEBSOCKET;

    const godStream$ = xs.merge(rawVideo$, videoUpstream$).map(i => i)

    // const sampledVideoStream$ = videoSampler$.compose(sampleCombine(rawVideo$))
    const vtree$ = xs.of(
          div('.screen',[
              div("Yo!"),
          ])
    );


    const sinks = {
        DOM: vtree$
    };

    return sinks
}