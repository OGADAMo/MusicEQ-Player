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

    button = document.querySelector(".link");




this.tracks = [
    {
        name: "A šta da radim",
        artist: "Azra",
        cover: "img/azra.jpg",
        source: "mp3/1.mp3",
    },
    {
        name: "Da raskinem sa njom",
        artist: "Ceca",
        cover: "img/ceca.jpg",
        source: "mp3/2.mp3",
    },
    {
        name: "Bježi kišo s prozora",
        artist: "Crvena Jabuka",
        cover: "img/crvena.jpg",
        source: "mp3/3.mp3",
    },
];

button.addEventListener("click", item => {
    location.href = "structure/equalizer.html"
})

// Initial state values
let audio = null,
    barWidth = null,
    duration = null,
    currentTime = null,
    isTimerPlaying = false,
    currentTrackIndex = 0,
    currentTrack = tracks[0];

// Set initial state values
audio = new Audio();
audio.src = currentTrack.source;
img.style.background = `url('${currentTrack.cover}')`;
title.innerText = currentTrack.name;
singer.innerText = currentTrack.artist;

play.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        isTimerPlaying = true;
    } else {
        audio.pause();
        isTimerPlaying = false;
    }
});

progressBarContainer.addEventListener('click', (x) => {
    let maxduration = audio.duration;
    let position = x.pageX - progressBarContainer.offsetLeft;
    let percentage = (100 * position) / progressBarContainer.offsetWidth;
    if (percentage > 100) percentage = 100;
    if (percentage < 0) percentage = 0;
    barWidth = percentage + "%";

    audio.currentTime = (maxduration * percentage) / 100;
    progressBar.style.width = `${barWidth}%`;


    img.src = currentTrack.cover;
});


next.addEventListener('click', () => {

    if (currentTrackIndex < tracks.length - 1) {
        currentTrackIndex++;
    } else {
        currentTrackIndex = 0;
    }

    currentTrack = tracks[currentTrackIndex];

    audio.src = currentTrack.source;
    img.style.background = `url('${currentTrack.cover}')`;
    title.innerText = currentTrack.name;
    singer.innerText = currentTrack.artist;

    barWidth = 0;
    progressBar.style.width = `${barWidth}%`;

    currentTimeHtml.innerText = `0:00`;
    durationHtml.innerText = `0:00`;

    audio.currentTime = 0;
    audio.src = currentTrack.source;

    setTimeout(() => {
        if (isTimerPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, 300);
});

back.addEventListener('click', () => {
    if (currentTrackIndex > 0) {
        currentTrackIndex--;
    } else {
        this.currentTrackIndex = this.tracks.length - 1;
    }
    currentTrack = tracks[currentTrackIndex];

    audio.src = currentTrack.source;
    img.style.background = `url('${currentTrack.cover}')`;
    title.innerText = currentTrack.name;
    singer.innerText = currentTrack.artist;

    barWidth = 0;
    progressBar.style.width = `${barWidth}%`;
    

    currentTimeHtml.innerText = `0:00`;
    durationHtml.innerText = `0:00`;

    audio.currentTime = 0;
    audio.src = currentTrack.source;

    setTimeout(() => {
        if (isTimerPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, 300);
});

audio.ontimeupdate = function () {
    if (audio.duration) {
        barWidth = (100 / audio.duration) * audio.currentTime;

        let durmin = Math.floor(audio.duration / 60);
        let dursec = Math.floor(audio.duration - durmin * 60);
        let curmin = Math.floor(audio.currentTime / 60);
        let cursec = Math.floor(audio.currentTime - curmin * 60);

        if (durmin < 10) durmin = "0" + durmin;
        if (dursec < 10) dursec = "0" + dursec;
        if (curmin < 10) curmin =curmin;
        if (cursec < 10) cursec = "0" + cursec;

        duration = durmin + ":" + dursec;
        currentTime = curmin + ":" + cursec;

        progressBar.style.width = `${barWidth}%`;

 
        currentTimeHtml.innerHTML = `${currentTime}`;   
        durationHtml.innerText = `${duration}`;

        if (isTimerPlaying) {
            playIcon.href.baseVal = '#icon-pause'

        } else {
            playIcon.href.baseVal = '#icon-play'
        }
    }
};

audio.onended = function () { };

