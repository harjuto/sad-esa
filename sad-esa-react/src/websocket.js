import React from 'react';

var video = document.getElementById('video');
var canvasContext = document.getElementById('canvas').getContext("2d");
const VIDEO_SAMPLE_RATE = 1000;


// Get access to the camera!
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
        video.src = window.URL.createObjectURL(stream);
    });
}


export default class WebSocket extends React.Component {

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
            }, VIDEO_SAMPLE_RATE);
        });
    }

    render() {
        return <div id="button-container">
            <button id="analyse" onClick={this.analyzePicture.bind(this)}>PIC</button>
       </div>
    }


    analyzePicture() {
        var self = this;
        self.props.reset();
        console.clear();
        console.info("RE ANALYZING...")
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
            console.info('Image analyzing service is at capacity');
        });
    }



}



export function makeVideoUploadDriver() {

}