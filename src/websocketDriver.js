/**
 * Created by thar on 25/11/16.
 */
import xs from 'xstream';

export function makeWebsocketDriver() {
    return () => {
        return xs.create({
            start: listener => {
                $.connection.hub.url = 'http://esabustop.azurewebsites.net/signalr/hubs';
                var villeProxy = $.connection.busStopHub;
                villeProxy.client.broadcastMessage = function(name, message) {
                    console.info("VILLE SENT ME: ", message)
                };

                $.connection.hub.start()
                  .done(function () {
                    var damn = villeProxy.server.send("omg", "amagaad");
                    damn.done = function () {
                        alert("daadaaa")
                    }
                    damn.fail = function() {
                        alert("FAILED")
                    }
                    })
                  .fail((e) => {
                      console.info("FAILED OMG", e)
                  })
                ;
            },
            stop: () => {
                console.info("Closing")
                // socket.close();
            },
        })
    };
}