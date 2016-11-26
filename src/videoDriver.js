/**
 * Created by thar on 25/11/16.
 */
import xs from 'xstream'

const VIDEO_SAMPLE_RATE = 500;

export function makeVideoDriver() {
    var video = document.getElementById('video');
    var canvasContext = document.getElementById('canvas').getContext("2d");

    return () => {
        return xs.create({
            start: listener => {
                video.addEventListener("play", function () {
                    setInterval(function () {
                        if (video.paused || video.ended) {
                            return;
                        }
                        canvasContext.drawImage(video, 0, 0, 600, 800);
                        var frame = canvasContext.getImageData(0, 0, 600, 800);
                        listener.next(frame.data);
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
                    alert("ERROR PUERTO RICO")
                }


            },
            stop: () => {

            }
        })

    }

}