/**
 * Created by thar on 25/11/16.
 */
import xs from 'xstream';

export function makeWebsocketDriver() {


    return () => {
        return xs.create({
            start: listener => {
                var connection = $.connection;
                var hubConnection = $.hubConnection;

                // $.connection.hub.url = "http://esabustop.azurewebsites.net/";
                // var connection = signalr.connection;
                // var connection = signalr.hubConnection;

                // var contosoChatHubProxy = connection.createHubProxy('contosoChatHub');
                // contosoChatHubProxy.on('addContosoChatMessageToPage', function(name, message) {
                //     console.info(name + ' ' + message);
                // });
                // connection.start().done(function() {
                //     console.info("working");

                    // Wire up Send button to call NewContosoChatMessage on the server.

                // });
            },
            stop: () => {
                console.info("Closing")
                // socket.close();
            },
        })
    };
}
