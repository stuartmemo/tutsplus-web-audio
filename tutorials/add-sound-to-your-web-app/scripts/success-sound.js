var context = new AudioContext();

// Play oscillators at certain frequency and for a certain time.
var playNote = function (frequency, startTime, duration, release) {
    var osc1 = context.createOscillator(),
        osc2 = context.createOscillator(),
        volume = context.createGain();

    // Set oscillator wave type.
    osc1.type = 'triangle';
    osc2.type = 'triangle';

    volume.gain.value = 0.1;    

    // Set up node routing.
    osc1.connect(volume);
    osc2.connect(volume);
    volume.connect(context.destination);

    osc1.frequency.setValueAtTime(frequency + 1, startTime);
    osc2.frequency.setValueAtTime(frequency - 2, startTime);

    osc1.start(startTime);
    osc2.start(startTime);

    if (release) {
        volume.gain.setValueAtTime(0.1, startTime + duration);
        volume.gain.linearRampToValueAtTime(0, startTime + duration + 0.1);
        duration += 10;
    }

    osc1.stop(startTime + duration);
    osc2.stop(startTime + duration);
};

var playSuccessSound = function () {
    var noteDuration = 0.106;
    playNote(493.883, context.currentTime, noteDuration);
    playNote(659.255, context.currentTime + noteDuration, noteDuration * 2, true);
};
