/**
 * Created by thar on 25/11/16.
 */
import xs from 'xstream';




export function makeVideoUploadDriver() {
    $.connection.hub.url = 'http://esabustop.azurewebsites.net/signalr/hubs';
    var villeProxy = $.connection.busStopHub;


    var video = document.getElementById('video');
    var canvasContext = document.getElementById('canvas').getContext("2d");
    const VIDEO_SAMPLE_RATE = 5000;

    return () => {
        return xs.create({
            start: listener => {

                villeProxy.client.broadcastMessage = function(name, message) {
                    listener.next(message);

                };
                $.connection.hub.start()
                  .done(function () {
                      video.addEventListener("play", function () {
                          setTimeout(function () {
                              if (video.paused || video.ended) {
                                  return;
                              }
                              // canvasContext.drawImage(video, 0, 0, 600, 800);
                              // var frame = canvasContext.getImageData(0, 0, 600, 800);
                              //
                              // var normalArray = Array.from(frame.data);
                              //
                              // var arrays = [], size = normalArray.length / 370;
                              //
                              // while (normalArray.length > 0) {
                              //     arrays.push(normalArray.splice(0, size));
                              // }

                              // arrays.forEach( data => {
                              //     villeProxy.server.postImage(data)
                              // })
                              // villeProxy.server.imageSent();
                              // canvasContext.putImageData(frame, 0, 0);
                              listener.next({active: true});


                          }, VIDEO_SAMPLE_RATE);
                      });

                      // Get access to the camera!
                      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                          // Not adding `{ audio: true }` since we only want video now
                          navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
                              video.src = window.URL.createObjectURL(stream);
                              video.play();
                          });
                      } else {
                          // alert("ERROR PUERTO RICO")
                      }
                  })
            },
            stop: () => {

            }

        })
    }
}

export function makeWebsocketDriver() {
    function webSocketDriver(video$){

        return xs.create({
            start: listener => {

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
            },
            stop: () => {
                console.info("Closing")
                // socket.close();
            },
        })
    };

    return webSocketDriver;
}

// function makeSockDriver(peerId) {
//     let sock = new Sock(peerId);
//
//     function sockDriver(outgoing$) {
//         outgoing$.addListener({
//             next: outgoing => {
//                 sock.send(outgoing));
//     },
//     error: () => {},
//       complete: () => {},
// });
//
// return xs.create({
//     start: listener => {
//         sock.onReceive(function (msg) {
//             listener.next(msg);
//         });
//     },
//     stop: () => {},
// });
// }
//
// return sockDriver;
// }