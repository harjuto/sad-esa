import React from 'react';

$.connection.hub.url = 'http://esabustop.azurewebsites.net/signalr/hubs';
var villeProxy = $.connection.busStopHub;
var video = document.getElementById('video');
var canvasContext = document.getElementById('canvas').getContext("2d");
const VIDEO_SAMPLE_RATE = 1000;


// Get access to the camera!
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
        video.src = window.URL.createObjectURL(stream);
    });
} else {
    // alert("ERROR PUERTO RICO")
}


export default class WebSocket extends React.Component {

    constructor() {
        super();
        this.connection = $.connection.hub;
    }

    componentDidMount() {
        let self = this;
        video.addEventListener("play", function () {
            setTimeout(function () {
                if (video.paused || video.ended) {
                    return;
                }
                canvasContext.drawImage(video, 0, 0, 600, 800);
                var canvas = document.getElementById('canvas');
                var dataurl = canvas.toDataURL("image/png");
                var binary = atob(dataurl.split(',')[1]);

                var array = [];
                for(var i = 0; i < binary.length; i++) {
                    array.push(binary.charCodeAt(i));
                }
                var imageBlob = new Blob([new Uint8Array(array)], {type: 'image/png'});


                var request = new Request("http://esabustopv2.azurewebsites.net/api/busstop", {
                    method: "POST",
                    body: imageBlob,
                    headers: new Headers({
                        "Content-Type": "application/octet-stream",
                    })
                });
                fetch(request)
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                      self.props.updateAnimation(json)
                      console.info(json)
                }).catch(function(err) {
                    console.log('Fetch Error :-S', err);
                });
                ;

                // villeProxy.server.postImage(binary).done( msg => {
                // alert(msg)// });
                // villeProxy.server.imageSent().done( msg => {
                //     debugger;
                //     alert(msg);
                // });

            }, VIDEO_SAMPLE_RATE);
        });


        this.connection.start()
          .done(function() {
              video.play();
          })
    }

    render() {
        var self = this;
        villeProxy.client.broadcastMessage = function(name, message) {
            console.info(message)
            self.props.updateAnimation("found")
        };
        return null;
    }




}



export function makeVideoUploadDriver() {

}