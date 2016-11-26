import React from 'react';

var self = this;
$.connection.hub.url = 'http://esabustop.azurewebsites.net/signalr/hubs';
var villeProxy = $.connection.busStopHub;
var video = document.getElementById('video');
var canvasContext = document.getElementById('canvas').getContext("2d");
const VIDEO_SAMPLE_RATE = 5000;

export default class WebSocket extends React.Component {

    render() {
        var self = this;
        villeProxy.client.broadcastMessage = function(name, message) {
            self.props.updateAnimation("found")
        };
        $.connection.hub.start()
          .done(function () {
              video.addEventListener("play", function () {
                  setTimeout(function () {
                      if (video.paused || video.ended) {
                          return;
                      }
                      canvasContext.drawImage(video, 0, 0, 200, 100);
                      var frame = canvasContext.getImageData(0, 0, 200, 100);

                      var normalArray = Array.from(frame.data);

                      var arrays = [], blocksize = normalArray.length / 370;

                      while (normalArray.length > 0) {
                          arrays.push(normalArray.splice(0, blocksize));
                      }

                      canvasContext.putImageData(frame, blocksize, 0);

                      villeProxy.server.imageSent();

                      arrays.forEach( dataset => {
                          villeProxy.server.postImage(dataset)
                      });
                      villeProxy.server.imageSent();

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


        return null;




    }




}



export function makeVideoUploadDriver() {

}