/**
 * Created by thar on 26/11/16.
 */


export function Websocket (sources) {
    $.connection.hub.url = 'http://esabustop.azurewebsites.net/signalr/hubs';
    var villeProxy = $.connection.busStopHub;
    villeProxy.client.broadcastMessage = function(name, message) {
        console.info("VILLE SENT ME: ", message)
    };

    $.connection.hub.start()
      .done(function () {
          video$.addListener({
              next: i => villeProxy.server.postImage(i),
              error: err => console.error(err),
              complete: () => console.log('completed'),
          });
      })
      .fail((e) => {
          console.info("FAILED OMG", e)
      })
    ;

    const vtree$ = xs.of(
      div('.mascot')
    )
    const sinks = {
        DOM: vtree$
    }
    return sinks
}
