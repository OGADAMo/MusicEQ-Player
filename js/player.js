let session = new Session();
session = session.getSession();

if (session !== "") {
    
} else {
    window.location.href = "/"
}
let wavesurfer = WaveSurfer.create({
    container: '#wavesurfer',
    mediaControl: true,
    waveColor: '#acb8cc',
    progressColor: '#71829e',
    barWidth: 2,
    barRadius: 0.2,
    cursorWidth: 2,
    height: 75,
    barGap: 2,
    cursorColor: 'red',
    responsive: true,
    fillParent: true,
    preload: false,
    audioContext: new AudioContext()
}), currentTrackIndex = 0, currentTrack = tracks[0], player = new Player();

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
    heart = document.querySelector(".heart"),
    heartIcon = document.querySelector(".heart use"),
    wavesurferContainer = document.querySelector('#wavesurfer');

 
player.setTrack(tracks[currentTrackIndex])

// Play button
play.addEventListener('click', function () {
    wavesurfer.playPause();
    player.updateIcon()
});

// Next button
next.addEventListener('click', function () {
    wavesurfer.pause();
    
    if (currentTrackIndex < tracks.length - 1) {
        currentTrackIndex++;
    } else {
        currentTrackIndex = 0;
    }
    
    player.setTrack(tracks[currentTrackIndex])
    setTimeout(() => {
        if(wavesurfer.isPlaying()){
            player.setDefault();
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

    player.setTrack(tracks[currentTrackIndex])
})

// Song progress
progressBarContainer.addEventListener('click', (e) => {
    let position = e.clientX - progressBarContainer.getBoundingClientRect().left;
    let percentage = (position * 100) / progressBarContainer.clientWidth;
    wavesurfer.seekTo(percentage / 100);
});

// Like song
heart.addEventListener("click", function () {
    if (heartIcon.href.baseVal === "#icon-heart-o") {
        heartIcon.href.baseVal = "#icon-heart";
    } else {
        heartIcon.href.baseVal = "#icon-heart-o";
    }
    
})

// Audio update
wavesurfer.on('audioprocess', function() {
    // It gets the current time and duration of the audio being played
    let currentTime = wavesurfer.getCurrentTime(),
     duration = wavesurfer.getDuration();

    // update the width of the progress bar to reflect the current progress of the audio
    progressBar.style.width = (currentTime / duration) * 100 + '%';
    
    currentTimeHtml.innerText = player.formatTime(currentTime);
    durationHtml.innerText = player.formatTime(duration);
});

// 
wavesurfer.on('finish', function() {
    currentTrackIndex++;
    if(currentTrackIndex >= tracks.length){
      currentTrackIndex = 0;
    }

    player.setTrack(tracks[currentTrackIndex])
});


let eq = new Equalizer()

eq.initialization();
wavesurfer.backend.setFilter(...Object.values(equalizer));

// Gain value for equalizer
document.querySelectorAll("#equalizer div input").forEach((frequency, i) => {
    frequency.addEventListener("input", item => {
        equalizer[i].gain.value = item.target.value
        
    })
})

// Create buttons to select presets
document.querySelectorAll(".pressets button").forEach(buttons => {
    buttons.addEventListener("click", item => {
            presets.forEach(bass => {
            if (bass.name === item.target.innerHTML) {
                eq.setPreset(bass.values)
            }
        })
    });   
})

