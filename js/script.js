let wavesurfer = WaveSurfer.create({
    container: '#wavesurfer',
    progressColor: 'blue',
    mediaControl: true,
    waveColor: '#A8DBA8',
    progressColor: '#3B8686',
    barWidth: 3,
    barRadius: 3,
    cursorWidth: 3,
    height: 100,
    barGap: 4,
    cursorColor: 'red',
    responsive: true,
    fillParent: true,
    preload: true,
    audioContext: new AudioContext()
}), currentTrackIndex = 0, currentTrack = tracks[0];

const play = document.querySelector(".play"),
    next = document.querySelector(".next"),
    back = document.querySelector(".previous"),

    progressBarContainer = document.querySelector('.progress'),
    progressBar = document.querySelector('.progress-bar'),

    currentTimeHtml = document.querySelector(".progress-current"),
    durationHtml = document.querySelector(".progress-duration"),

    playIcon = document.querySelector('.fa-play'),
    img = document.querySelector('.player-cover-item'),
    title = document.querySelector(".album-info-name"),
    singer = document.querySelector(".album-info-track"),
    
    wavesurferContainer = document.querySelector('#wavesurfer');



function formatTime(seconds) {
    // function to format the current time and duration into a more readable format
    let minutes = (Math.floor(seconds / 60)).toFixed(0);
    let secondsLeft = (seconds % 60).toFixed(0);
    let formattedTime = `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
    return formattedTime;
}

function setTrack(params) {
    // Load the track
    wavesurfer.load(params.source);

    // Set track info
    title.innerText = params.name;
    singer.innerText = params.artist;
    img.style.background = `url('${params.cover}')`;
    
    wavesurfer.play();
    
}

function setDefault() {
    progressBar.style.width = 0 + '%';
    currentTimeHtml.innerText = "0:00";
    durationHtml.innerText = "";
    playIcon.setAttribute('href', '#icon-play');
}

function updateIcon() {
    playIcon.setAttribute('href', wavesurfer.isPlaying() ? '#icon-pause' : '#icon-play');
}

// Play button
play.addEventListener('click', function () {
    wavesurfer.playPause();
    updateIcon()
});

// Next button
next.addEventListener('click', function () {
    wavesurfer.pause();
    
    if (currentTrackIndex < tracks.length - 1) {
        currentTrackIndex++;
    } else {
        currentTrackIndex = 0;
    }
    
    setTrack(tracks[currentTrackIndex])
    setTimeout(() => {
        if(wavesurfer.isPlaying()){
            setDefault();
        }
        wavesurfer.playPause()  
            
    }, 1);

    
   
});

// Previous button
back.addEventListener('click', function () {
    if (currentTrackIndex > 0) {
        currentTrackIndex--;
    } else {
        currentTrackIndex = tracks.length - 1;
    }

    setTrack(tracks[currentTrackIndex])
})

progressBarContainer.addEventListener('click', (e) => {
    let position = e.clientX - progressBarContainer.getBoundingClientRect().left;
    let percentage = (position * 100) / progressBarContainer.clientWidth;
    wavesurfer.seekTo(percentage / 100);
});

// Audio update
wavesurfer.on('audioprocess', function() {
    // It gets the current time and duration of the audio being played
    let currentTime = wavesurfer.getCurrentTime(),
     duration = wavesurfer.getDuration();

    // update the width of the progress bar to reflect the current progress of the audio
    progressBar.style.width = (currentTime / duration) * 100 + '%';
    
    currentTimeHtml.innerText = formatTime(currentTime);
    durationHtml.innerText = formatTime(duration);
 

});

wavesurfer.on('finish', function() {
    currentTrackIndex++;
    if(currentTrackIndex >= tracks.length){
      currentTrackIndex = 0;
    }

    setTrack(tracks[currentTrackIndex])
});

setTrack(tracks[currentTrackIndex])
