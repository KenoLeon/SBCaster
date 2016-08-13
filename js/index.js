// Notes: Video is a delicate beast at the moment: mid 2016
// Https is needed on Chrome, no Safari Support

//To Do: remove Jquery ?
// change to the newer : MediaDevices.getUserMedia()
// see: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia

var videoTracks;
var video;


$(document).ready(function(e) {
  video = document.getElementById('video');
});

$('#videoStop').on('click', function(e) {
  e.preventDefault();
  if (navigator.mozGetUserMedia) {
    video.pause();
    video.mozSrcObject=null;
  } else {
    stream.getVideoTracks()[0].stop();
  }

});

$('#videoStart').on('click', function(e) {
  e.preventDefault();
  StartVideo();
});

function StartVideo() {

  navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);
  if (navigator.getUserMedia) {
    navigator.getUserMedia({
        video: true,
        audio: false
      },
      function(stream) {
        this.stream = stream;
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
      },
      function(error) {
        console.log(error)
      }
    );
  } else {
    console.log('No Media Support')
    return;
  }

}
