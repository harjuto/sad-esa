import xs from 'xstream'


export function Camera() {








    return {

    }
}


function myCoolVideoPlayer() {
    // Grab elements, create settings, etc.
    var video = document.getElementById('video');
    var canvasContext = document.getElementById('canvas').getContext("2d");

    video.addEventListener("play", function() {

        setTimeout(function () {
            if (video.paused || video.ended) {
                return;
            }
            canvasContext.drawImage(video, 0, 0, 600, 800);
            var frame = canvasContext.getImageData(0, 0, 600, 800);
            let l = frame.data.length / 4;

            for (let i = 0; i < l; i++) {
                if ( i % 5 === 0 ) {
                    let r = frame.data[i * 4 + 0];
                    let g = frame.data[i * 4 + 1] = 0;
                    let b = frame.data[i * 4 + 2];
                    frame.data[i * 4 + 0] = b;
                    frame.data[i * 4 + 2] = r;
                }

                if (i % 600 === 0) {
                    frame.data[i * 4 + 0] = 0;
                    frame.data[i * 4 + 2] = 0;
                }
            }
            canvasContext.putImageData(frame, 0, 0);

        }, 1000);
    });

    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        });
    } else {
        alert("ERROR PUERTO RICO")
    }
}

new myCoolVideoPlayer();