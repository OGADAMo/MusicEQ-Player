// Store preset values
let bass = {
    band1: 5,
    band2: -5,
    band3: 0,
    band4: 5,
    band5: 10
    };

    let preset2 = {
    band1: -12,
    band2: -12,
    band3: -12,
    band4: -12,
    band5: -12
    };
    // Create function to recall preset values
    let lowSlider = document.getElementById('low-slider');
    let lowMidSlider = document.getElementById('low-mid-slider');
    let midSlider = document.getElementById('mid-slider');
    let highMidSlider = document.getElementById('high-mid-slider');
    let highSlider = document.getElementById('high-slider');

    // create 5 band equalizer
    let equalizer = {};
    let frequencyRanges = [60, 230, 910, 3000, 14000];

    function setPreset(preset) {
        document.getElementById("low-slider").value = preset.band1;
        equalizer[0].gain.value = preset.band1;

        document.getElementById("low-mid-slider").value = preset.band2;
        equalizer[1].gain.value = preset.band2;

        document.getElementById("mid-slider").value = preset.band3;
        equalizer[2].gain.value = preset.band3;

        document.getElementById("high-mid-slider").value = preset.band4;
        equalizer[3].gain.value = preset.band4;

        document.getElementById("high-slider").value = preset.band5;
        equalizer[4].gain.value = preset.band5;
    }


    for (let i = 0; i < 5; i++) {
        equalizer[i] = wavesurfer.backend.ac.createBiquadFilter();
        equalizer[i].type = 'peaking';
        equalizer[i].frequency.value = frequencyRanges[i];
        equalizer[i].Q.value = 1;
        equalizer[i].gain.value = 0;
    }

    wavesurfer.backend.setFilter(equalizer[0], equalizer[1], equalizer[2], equalizer[3], equalizer[4]);


    // Listen to change events on the sliders
    lowSlider.addEventListener('input', () => {
        equalizer[0].gain.value = int(this.value);
    });

    lowMidSlider.addEventListener('input', () => {
        equalizer[1].gain.value = int(this.value);
    });

    midSlider.addEventListener('input', () => {
        equalizer[2].gain.value = int(this.value);
    });

    highMidSlider.addEventListener('input', () => {
        equalizer[3].gain.value = int(this.value);
    });

    highSlider.addEventListener('input', () => {
        equalizer[4].gain.value = int(this.value);
    });
    

    // Create buttons to select presets
    let bassBtn = document.getElementById("bass-btn");
    bassBtn.addEventListener("click", function() {
        setPreset(bass);
    });

    let preset2Btn = document.getElementById("preset2-btn");
    preset2Btn.addEventListener("click", function() {
        setPreset(preset2);
    });
